export interface Task {
  id: string;
  name: string;
  duration: string;
  elapsed: string;
  isCompleted: boolean;
}

export interface User {
  email?: string;
  username: string;
  password: string;
  tasks?: Task[];
}
