import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';

export default {
  metadataProvider: ReflectMetadataProvider,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'postgresql',
  clientUrl: process.env.MIKRO_ORM_CLIENT_URL,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: 'dist/migrations', // path to the folder with migrations
    pathTs: 'src/migrations',
    snapshot: false,
  },
} as Parameters<typeof MikroORM.init>[0];
