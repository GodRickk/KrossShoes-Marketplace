import { Body, Controller, Delete, Get, Param, Post, Put, Render, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/transform.interceptor";
import { OrderService } from "./order.service";
import * as Entity from "src/_gen/prisma-class/order";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto"
import { Order } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";

@UseInterceptors(TransformInterceptor)
@Controller()
@ApiTags('order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) {
    }

    /*
    Реализовать рендер html страницы с созданием заказа
    рендер страницы с оформлением заказа

    @Get('/order')
    @ApiBody({type: AuthorizeCustomerDto})
    @ApiResponse({type: Customer})
    authorize(@Body() customerDto: AuthorizeCustomerDto): Customer {
        return null;
    }*/

    @Get('/order/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    //@ApiResponse({type: Entity.Order})
    @ApiResponse({status: 200, description: "OK", type: Entity.Order})
    @ApiResponse({status: 400, description: "Cannot get order by this ID"})
    @ApiResponse({status: 404, description: "Order with this id was not found"})
    async find(@Param('id') id: number): Promise<Order> {
        return await this.OrderService.findById(id)
    }

    @Get('/order/:customer_id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiResponse({status: 200, description: "OK", type: Entity.Order})
    @ApiResponse({status: 400, description: "Cannot get orders by this customer_ID"})
    @ApiResponse({status: 404, description: "Orders with this customer_ID was not found"})
    async findCostomersOrders(@Param('customer_id') customer_id: number): Promise<Order[]> {
        return await this.OrderService.findByCustomerId(customer_id)
    }

    @Post('/order')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiBody({type: CreateOrderDto})
    @ApiResponse({status: 200, description: "OK", type: Entity.Order})
    @ApiResponse({status: 400, description: "Cannot create this order"})
    async create(@Body() orderDto: CreateOrderDto): Promise<Order> {
        return await this.OrderService.saveOrder(orderDto)
    }

    @Delete('/order/:id')
    @ApiResponse({status: 200, description: "OK", type: Entity.Order})
    @ApiResponse({status: 400, description: "Cannot delete orders by this ID"})
    @ApiResponse({status: 404, description: "Order with this ID was not found"})
    async delete(@Param('id') id: number): Promise<Order> {
        return await this.OrderService.delete(id)
    }
}