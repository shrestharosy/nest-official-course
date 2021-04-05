import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// this module class will be used to register any global enhancers , like here ApiKeyGuard
@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule {}
