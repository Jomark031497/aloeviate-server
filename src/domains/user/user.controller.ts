import { verify } from 'argon2';
import { Request, Response } from 'express';
import { DI } from '../..';
import log from '../../utils/logger';
import { User } from './user.entity';

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    const userExists = await DI.em.findOne(User, { username });
    const emailExists = await DI.em.findOne(User, { email });
    if (userExists) return res.status(400).json({ username: 'username is already taken' });
    if (emailExists) return res.status(400).json({ email: 'email is already taken' });

    const user = DI.em.create(User, req.body);

    await DI.userRepository.persist(user).flush();
    req.session.userId = user.id;
    return res.status(200).json(user);
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await DI.em.findOne(User, { username }, { populate: ['password'] });
    if (!user) return res.status(400).json({ user: 'incorrect username/password' });

    const validPassword = await verify(user.password, password);
    if (!validPassword) return res.status(400).json({ user: 'incorrect username/password' });

    req.session.userId = user.id;

    return res.status(200).json(user);
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
