import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import RootEntity from "./RootEntity";
import Task from "./Task";

@Entity("users")
export default class User extends RootEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
