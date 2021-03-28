import { Module } from '@nestjs/common';
import { COFFEE_BRANDS } from 'src/custom-providers/coffees.constants';
import { CustomProvidersService } from './custom-providers.service';

export class MockCoffeeService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
@Module({
  providers: [
    { provide: CustomProvidersService, useValue: new MockCoffeeService() },
    { provide: COFFEE_BRANDS, useValue: ['srew', 'mescafe'] },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
})
export class CustomProvidersModule {}
