import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['task'],
    protoPath: [join(__dirname, '../src/tasks/protos/tasks.proto')],
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  // app.useGlobalFilters(new ErrorFilter())

  await app.listen(() => {
    console.log('Microservice is listening');
  });
}

bootstrap();
