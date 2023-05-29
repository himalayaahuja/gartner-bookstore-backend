import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { invertObj as invertEnumerator } from 'ramda';
import { toUpper, compose } from 'ramda';
import { snakeCase } from 'snake-case';

const toSnakeCaseUpper = compose(toUpper, snakeCase);

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest<Request>();

    const statusObject = invertEnumerator(HttpStatus);

    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception.message, exception.stack, 'ApiExceptionFilter');
    }

    return response.status(status).json({
      status,
      context: toSnakeCaseUpper(request.url.replace('/api/v1', '').split('?')[0]),
      code: exception.code || statusObject[status] || 'INTERNAL_SERVER_ERROR',
      message: exception.message || 'Internal Server Error',
      data: exception.data || null,
    });
  }
}
