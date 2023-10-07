import { IsNotEmpty } from 'class-validator';
import { Order } from './order';
import { Review } from './review';
import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({ type: BigInt })
  id: bigint;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: BigInt })
  @IsNotEmpty()
  phone_number: bigint;

  @ApiProperty({ isArray: true, type: () => Order })
  order: Order[];

  @ApiProperty({ isArray: true, type: () => Review })
  review: Review[];
}
