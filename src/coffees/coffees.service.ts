import { Flavor } from './entities/flavor.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    // flavors column is relation for our coffee
    return this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    const found = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!found) {
      //   throw new HttpException(
      //     `Coffee with id ${id} not found`,
      //     HttpStatus.NOT_FOUND,
      //   );
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return found;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // create a coffee class instance
    // const coffee = this.coffeeRepository.create(createCoffeeDto);
    // return this.coffeeRepository.save(coffee);

    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({ name });
    if (!flavor) {
      return this.flavorRepository.create({ name });
    }
    return flavor;
  }
}
