import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'Pass123!',
  database: 'tasks',
  entities: [__dirname + '/../tasks/entities/*.entity.{js,ts}'],
  synchronize: true,
};
