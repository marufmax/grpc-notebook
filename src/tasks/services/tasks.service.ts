import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRepository } from '../repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  // private tasks: Task[] = [];
  //
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  //
  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTaks();
  //
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //
  //   return tasks;
  // }
  //
  //
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks.push(task);
  //
  //   return task;
  // }
  //
  async deleteTaskById(id: number): Promise<void> {
    const task: Task = await this.getTaskById(id);

    await this.taskRepository.remove(task);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
