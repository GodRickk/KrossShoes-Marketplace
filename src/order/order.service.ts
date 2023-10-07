import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderStatus, PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  prisma = new PrismaClient()

  async findById (id : number): Promise<Order> {


    const order = this.prisma.order.findFirst({
      where: {
        AND: [
          {id: BigInt(id)}
        ]
      }
    })

    if(!order) {
      throw new NotFoundException("Product Not Founded")
    }
    return order 
  }

  async findByCustomerId (id : number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        AND: [
          {customer_id: BigInt(id)}
        ]
      }
    })
  }

  async saveOrder(orderDto: CreateOrderDto): Promise<Order> {
    let order = await this.prisma.order.create({
      data: {
        customer: {connect: {id: BigInt(orderDto.customer_id)}},
        /*product_id: orderDto.product_id,*/
        total_cost: orderDto.total_cost,
        delivery_adress: orderDto.delivery_adress,
        order_status: OrderStatus.reserved,
      }
    })
    return order
  }

  async delete(id: number): Promise<Order> {
    let order = await this.prisma.order.delete({
      where: {
        id: BigInt(id)
      },
    })
    if(!order) {
      throw new NotFoundException("Product Not Founded")
    }
    return order
  }

  async update (id : number, orderDto: UpdateOrderDto, order_status_changed: OrderStatus): Promise<Order> {
    let order = this.prisma.order.update({
      where: {id: BigInt(id)},
      data: {
        delivery_adress: orderDto.delivery_adress,
        order_status: order_status_changed
      }
    })
    return order
  }




  
}