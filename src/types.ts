export interface Task {
  id: number | string;
  name: string;
  duration: number;
  isCompleted: boolean;
  elapsed: number;
}
