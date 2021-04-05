import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// guard class with injectable decorator just like providers
@Injectable()
// guard should implement the CanActivate interface exported from nest js common
export class ApiKeyGuard implements CanActivate {
  // reflector class allows us to retrieve metadata within a specific context
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  // returns a boolean indicating whether the current request is allowed to proceed or not
  // may return a response  that is sync or async like Prmoise or Observable
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // look up metadata by key
    // second argument is the target object context (here targeting method handler)
    // FYI, to retrieve metadata from  a class level call context.getClass
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    // switchToHttp methd gives us access to native in-flight req/res and next objects
    // getRequest returns underlying platforms's request wrapper objext, here Express
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
