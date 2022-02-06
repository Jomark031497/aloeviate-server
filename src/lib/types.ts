export interface IUser {
  _id: string;
  username: string;
  password: string;
  tasks: ITask[];
}

export interface ITask {
  _id: string;
  name: string;
  duration: number;
  elapsed: number;
  isCompleted: boolean;
  elapsedTime: number;
  updatedAt?: string;
  createdAt?: string;
}
