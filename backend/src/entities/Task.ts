import { Entity, Index, Column, ManyToOne, JoinColumn } from "typeorm";
import RootEntity from "./RootEntity";
import User from "./User";

@Entity("tasks")
export default class Task extends RootEntity {
  constructor(task: Partial<Task>) {
    super();
    Object.assign(this, task);
  }

  @Index()
  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  elapsed: number;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "usaname", referencedColumnName: "username" })
  user: User;
}
