import { Injectable, Module } from '@nestjs/common';
import { COFFEE_BRANDS } from 'src/custom-providers/coffees.constants';
import { CustomProvidersService } from './custom-providers.service';

export class MockCoffeeService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['srew', 'mescafeu'];
  }
}
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
    CoffeeBrandsFactory,
    // inject takes an array of providers
    // these providers gets passed into our useFactory function
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
  ],
})
export class CustomProvidersModule {}
