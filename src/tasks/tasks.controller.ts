import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
