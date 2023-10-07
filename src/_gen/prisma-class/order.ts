import { Customer } from './customer';
import { Product } from './product';
import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Order {
  @ApiProperty({ type: BigInt })
  id: BigInt;

  @ApiProperty({ type: () => Customer })
  customer: Customer;

  @ApiProperty({ isArray: true, type: () => Product })
  product: Product[];

  @ApiProperty({ type: BigInt })
  @IsNotEmpty()
  customer_id: BigInt;

  @ApiProperty({ type: BigInt })
  @IsNotEmpty()
  total_cost: BigInt;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  delivery_adress: string;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  order_status: OrderStatus;
}
