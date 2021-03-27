import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  getAllCoffee(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  getCoffeeById(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  addCoffee(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Patch()
  updateCoffee(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  removeCoffee(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
