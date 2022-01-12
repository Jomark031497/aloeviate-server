import { Entity, Index, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity("tasks")
export default class Task extends BaseEntity {
  constructor(task: Partial<Task>) {
    super();
    Object.assign(this, task);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  elapsed: number;

  @Column()
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date; // automatically add a createdAt timestamp for child classes

  @UpdateDateColumn()
  updatedAt: Date; // automatically add a updatedAt timestamp for child classes
}
