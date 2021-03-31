import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

// guard class with injectable decorator just like providers
@Injectable()
// guard should implement the CanActivate interface exported from nest js common
export class ApiKeyGuard implements CanActivate {
  // returns a boolean indicating whether the current request is allowed to proceed or not
  // may return a response  that is sync or async like Prmoise or Observable
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // switchToHttp methd gives us access to native in-flight req/res and next objects
    // getRequest returns underlying platforms's request wrapper objext, here Express
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === process.env.API_KEY;
  }
}
