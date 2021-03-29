import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeesService } from './coffees.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

//UseGuards, UseInterceptors .... also available
@UsePipes(new ValidationPipe())
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @UsePipes(ValidationPipe)
  @Get()
  getAllCoffee(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  getCoffeeById(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  addCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  updateCoffee(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  removeCoffee(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
