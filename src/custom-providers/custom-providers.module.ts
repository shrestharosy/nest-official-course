import { Module } from '@nestjs/common';
import { COFFEE_BRANDS } from 'src/custom-providers/coffees.constants';

@Module({
  providers: [{ provide: COFFEE_BRANDS, useValue: ['srew', 'mescafe'] }],
})
export class CustomProvidersModule {}
