import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // if handle method is not called, the route handler method won't be executed at all
    // handle returns RxJs observable
    // data is response sent back from route handler
    return next.handle().pipe(map((data) => console.log(data)));
  }
}
