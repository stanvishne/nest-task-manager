import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './dto/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return Promise.resolve();
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    await this.tasksRepository.save({ ...task, status });

    return { ...task, status };
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    // const { status, search } = filterDto;
    return this.tasksRepository.getTasks(filterDto);
  }

  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto) {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   if (task) {
  //     const updated = {
  //       ...task,
  //       status,
  //     };
  //     this.tasks = this.tasks.map((task) => (task.id === id ? updated : task));
  //     return updated;
  //   }
  // }
}
