import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRepository } from '../repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
  // private tasks: Task[] = [];
  //
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const task: Task = await this.getTaskById(id, user);

    await this.taskRepository.remove(task);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
