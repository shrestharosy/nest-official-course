import { Injectable, Module } from '@nestjs/common';
import { COFFEE_BRANDS } from 'src/custom-providers/coffees.constants';
import { Connection } from 'typeorm';
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
    // Asynchronous "useFactory" (async provider example)
    {
      provide: 'COFFEE_BRANDS',
      // Note "async" here, and Promise/Async event inside the Factory function
      // Could be a database connection / API call / etc
      // In our case we're just "mocking" this type of event with a Promise
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [Connection],
    },
  ],
})
export class CustomProvidersModule {}
