import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { RecommendationEvent } from 'src/events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, RecommendationEvent]),
    ConfigModule,
    // partial configuration namespaces
    // ConfigModule.forFeature(coffeesConfig),
  ], //pass array of entities here
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
