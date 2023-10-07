import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  amount: bigint;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  size: number;

  @ApiProperty()
  order_id: bigint;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

/*amount BigInt
  price Float
  size Float
  order Order @relation(fields: [order_id], references: [id])
  order_id BigInt*/
