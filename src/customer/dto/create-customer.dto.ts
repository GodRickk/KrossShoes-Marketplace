import { ApiProperty } from '@nestjs/swagger';
import { Order, Review } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  phone_number: bigint;
}

/*name String
  surname String
  email String
  password String
  phone_number BigInt*/
