import { TaskStatus } from '../task-status.enum';
export class UpdateTaskDto {
  id: string;
  status: TaskStatus;
}
