import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  customer_id: bigint;

  @ApiProperty()
  @IsNotEmpty()
  total_cost: bigint;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  @IsNotEmpty()
  delivery_adress: string;
}

/*customer_id BigInt
  product_id BigInt
  total_cost BigInt
  delivery_adress String
  order_status OrderStatus*/
