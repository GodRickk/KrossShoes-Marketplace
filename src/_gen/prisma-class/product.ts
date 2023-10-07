import { IsNotEmpty } from 'class-validator';
import { Order } from './order';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ type: BigInt })
  id: BigInt;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: BigInt })
  @IsNotEmpty()
  amount: BigInt;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  size: number;

  @ApiPropertyOptional({ type: () => Order })
  order?: Order;

  @ApiPropertyOptional({ type: BigInt })
  order_id?: BigInt;
}
