export interface Task {
  id: number;
  name: string;
  duration: number;
  elapsed?: number;
  isCompleted: boolean;
}

export interface User {
  email?: string;
  username: string;
  password: string;
  tasks?: Task[];
}
