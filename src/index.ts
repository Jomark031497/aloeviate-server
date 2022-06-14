import 'reflect-metadata';
import express from 'express';
import log from './utils/logger';
import http from 'http';
import 'dotenv/config';
import { MikroORM, EntityManager, EntityRepository, RequestContext } from '@mikro-orm/core';
import { User } from './domains/user/user.entity';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { COOKIE_NAME, __prod__ } from './constants';
import userRoutes from './domains/user/user.route';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
};

const main = async () => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis }),
      secret: <string>process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
    }),
  );
  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));

  app.use('/api/user', userRoutes);

  app.listen(PORT, () => log.info(`listening at port ${PORT}`));
};

main().catch((err) => {
  throw err;
});
