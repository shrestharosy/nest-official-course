import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])], //pass array of entities here
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
