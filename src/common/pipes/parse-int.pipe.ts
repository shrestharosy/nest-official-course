import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

// USAGE
// say, the data passed by the user needs to go undego certain change before it can be handled properly by the route methods
// say, to provide default values
@Injectable()
export class ParseIntPipe implements PipeTransform {
  // value is input value of the currently processed arguments, before it is received by route handler method and metadata of currently processed arguments
  // assuming value as string
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed, ${val} is not an integer`,
      );
    }
    return val;
  }
}
