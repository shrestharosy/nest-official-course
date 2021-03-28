import { CoffeesModule } from './../coffees/coffees.module';
import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
