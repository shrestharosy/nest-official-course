import { COFFEE_BRANDS } from './coffees.constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CustomProvidersService {
  constructor(@Inject(COFFEE_BRANDS) coffeeBrands: string[]) {
    console.log(coffeeBrands);
  }
}
