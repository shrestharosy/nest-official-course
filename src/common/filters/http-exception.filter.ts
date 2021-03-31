import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

// Generate Filter with Nest CLI
// nest g filter common/filters/http-exception
// can accept multiple params so we can handle multiple exceptions at once
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // get a hold of the original response

    // switchToHttp methd gives us access to native in-flight req/res and next objects
    const ctx = host.switchToHttp();

    // getResponse returns underlying platforms's response , here Express
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    // raw response
    const exceptionResponse = exception.getResponse();

    // if string then assign the string to message prop of an object
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
