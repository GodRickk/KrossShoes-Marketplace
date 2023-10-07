import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  delivery_adress: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  order_status: OrderStatus;
}