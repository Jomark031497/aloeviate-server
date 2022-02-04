export interface IUser {
  _id: string;
  username: string;
  password: string;
  tasks: ITask[];
}

export interface ITask {
  duration: number;
  isCompleted: boolean;
  elapsedTime: number;
  _id: string;
  name: string;
  updatedAt?: string;
  createdAt?: string;
}
