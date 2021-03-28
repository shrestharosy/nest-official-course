import { Module } from '@nestjs/common';
import { COFFEE_BRANDS } from 'src/custom-providers/coffees.constants';
import { CustomProvidersService } from './custom-providers.service';

export class MockCoffeeService {}
@Module({
  providers: [
    { provide: CustomProvidersService, useValue: new MockCoffeeService() },
    { provide: COFFEE_BRANDS, useValue: ['srew', 'mescafe'] },
  ],
})
export class CustomProvidersModule {}
