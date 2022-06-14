import { BeforeCreate, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { hash } from 'argon2';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @BeforeCreate()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
