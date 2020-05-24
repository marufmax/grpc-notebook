import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatusValidation } from '../pipes/task-status-validation.pipe';
import { Task } from '../entities/task.entity';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   console.log(filterDto);
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilters(filterDto);
  //   }
  //
  //   return this.tasksService.getAllTaks();
  // }
  //
  // @Get('/:id')
  // getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
  //   return this.tasksService.getTaskById(id);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidation) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
