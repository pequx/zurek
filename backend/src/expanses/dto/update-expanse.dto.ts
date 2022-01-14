import { PartialType } from '@nestjs/mapped-types';
import { CreateExpanseDto } from './create-expanse.dto';

export class UpdateExpanseDto extends PartialType(CreateExpanseDto) {}
