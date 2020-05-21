import { ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

export class ErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = error.stack;

        return response.status(status).send(message);
    }
}