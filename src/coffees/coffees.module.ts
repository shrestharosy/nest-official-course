import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { RecommendationEvent } from 'src/events/entities/event.entity';
import { CustomCoffeeService } from './customProvider/custom.coffee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, RecommendationEvent])], //pass array of entities here
  controllers: [CoffeesController],
  providers: [CoffeesService],
  // providers: [{ provide: CoffeesService, useValue: new CustomCoffeeService() }],
  exports: [CoffeesService],
})
export class CoffeesModule {}
