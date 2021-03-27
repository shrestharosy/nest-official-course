import { CreateCoffeeDto } from './create-coffee.dto';
import { PartialType } from '@nestjs/mapped-types';

// export class UpdateCoffeeDto {
//   readonly name?: string;
//   readonly brand?: string;
//   readonly flavors?: string[];
// }

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
