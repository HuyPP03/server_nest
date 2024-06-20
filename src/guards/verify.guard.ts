import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { VerifyEnum } from '../enums/verify.enum';
import { VERIFIES_KEY } from '../decorators/verify.decorator';

@Injectable()
export class VerifiesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredVerifies = this.reflector.getAllAndOverride<VerifyEnum[]>(
      VERIFIES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredVerifies) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<Request>();
    const required = requiredVerifies.some(
      (isVerify) => user.isVerify === !!isVerify,
    );
    if (!required) {
      throw new HttpException('User is not verified', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
