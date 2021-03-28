import { Module } from '@nestjs/common';
import { CustomProvidersService } from './custom-providers.service';

export class MockCoffeeService {}
@Module({
  providers: [
    { provide: CustomProvidersService, useValue: new MockCoffeeService() },
  ],
})
export class CustomProvidersModule {}
