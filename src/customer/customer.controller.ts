import { Body, Controller, Delete, Get, Param, Post, Put, Render, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/transform.interceptor";
import { CustomerService } from "./customer.service";
import { AuthorizeCustomerDto } from "./dto/authorize-customer.dto";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import * as Entity from "src/_gen/prisma-class/customer";
import { Customer } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { AuthGuard } from "src/auth/auth.guard";

@UseInterceptors(TransformInterceptor)
@Controller()
@ApiTags('customer')
export class CustomerController {
    constructor(private readonly CustomerService: CustomerService) {
    }

    /*Рендер страницы логина и регистрации*/

    @Get('/customer')
    @ApiResponse({status: 200, description: "OK", type: Entity.Customer})
    @ApiResponse({status: 400, description: "Cannot get customers"})
    @ApiResponse({status: 404, description: "Customerы were not found"})
    @ApiBody({type: AuthorizeCustomerDto})
    @ApiResponse({type: Entity.Customer})
    async getAllCustomers(): Promise<Customer[]> {
        return await this.CustomerService.getAllCustomers();
    }

    @Get('/customer/:id')
    @ApiResponse({status: 202, description: "OK", type: Entity.Customer})
    @ApiResponse({status: 400, description: "Cannot get customer by this ID"})
    @ApiResponse({status: 404, description: "Customer with this id was not found"})
    @UseGuards(AuthGuard)
    @ApiResponse({type: Entity.Customer})
    async find(@Param('id') id_tofind: number): Promise<Customer> {
        return await this.CustomerService.findById(id_tofind)
    }


    @Post('/customer')
    @ApiBody({type: CreateCustomerDto})
    @ApiResponse({status: 201, description: "OK", type: Entity.Customer})
    @ApiResponse({status: 400, description: "Cannot create this customer"})
    async create(@Body() customerDto: CreateCustomerDto): /*Promise<Customer>*/ Promise<any>  {
        // console.log(Cus)
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(customerDto.password, salt)
        customerDto.password = hash
        
        console.log(customerDto)
        const data = await this.CustomerService.saveCustomer(customerDto)
        const tmp = {
            customers: data,
            status: 201
        }
        // return await this.CustomerService.saveCustomer(customerDto)
        return tmp;
    }


    @Delete('/customer/:id')
    @ApiResponse({status: 200, description: "OK", type: Entity.Customer})
    @ApiResponse({status: 400, description: "Cannot delete this customer"})
    @ApiResponse({status: 404, description: "Cannot delete customer by this id"})
    @ApiResponse({type: Entity.Customer})
    async delete(@Param('id') id: number): Promise<Customer> {
        return await this.CustomerService.delete(id)
    }


}