import { Body, Controller, Delete, Get, Param, Post, Put, Render, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/transform.interceptor";
import { ProductService } from "./product.service";
import { Product } from "@prisma/client";
import * as Entity from "src/_gen/prisma-class/product";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


//@UseInterceptors(TransformInterceptor)
@Controller()
@ApiTags('product')
export class ProductController {
    constructor(private readonly ProductService: ProductService) {
    }

    // @Get('/product')
    // @Render('product.hbs')
    // products() {
    // return { isLogged: false };
    // }

    @Get('/product')
    @ApiResponse({status: 202, description: "OK", type: CreateProductDto})
    @ApiResponse({status: 400, description: "Cannot get all products"})
    @Render('product.hbs')
    async products()  {
        const opt = {
            name: "ecaknck",
            pass: "1111"
        }
        const res = await this.ProductService.getAllProducts()
        //console.log(res);
        return {res};
        // return{ isLogged: false };        
        //return this.ProductService.getAllProducts()
    }

    @Get('/product/:id')
    @ApiResponse({status: 202, description: "OK", type: CreateProductDto})
    @ApiResponse({status: 400, description: "Cannot get product by this ID"})
    @ApiResponse({status: 404, description: "product with this id was not found"})
    @ApiResponse({type: Entity.Product})
    async find(@Param('id') id: number): Promise<Product> {
        const data = await this.ProductService.findById(id)
        return data
    }

    @Get('/product/:size')
    @ApiResponse({type: Entity.Product})
    async findBySize(@Param('size') size_to_search: number): Promise<Product[]> {
        return await this.ProductService.findBySizeId(size_to_search)
    }

    @Post('/product')
    @ApiResponse({status: 201, description: "Product created", type: CreateProductDto})
    @ApiResponse({status: 400, description: "Cannot create such product"})
    @ApiBody({type: CreateProductDto})
    @ApiResponse({type: Entity.Product})
    async create(@Body() productDto: CreateProductDto): Promise<Product> {
        return await this.ProductService.saveProduct(productDto)
    }

    @Post('/product/to_order')
    @ApiResponse({status: 201, description: "Product to order created", type: CreateProductDto})
    @ApiResponse({status: 400, description: "Cannot create product by this ID"})
    @ApiBody({type: CreateProductDto})
    @ApiResponse({type: Entity.Product})
    async createWithOrder(@Body() productDto: CreateProductDto): Promise<Product> {
        return await this.ProductService.saveProductToOrder(productDto)
    }

    @Delete('/product/:id')
    @ApiResponse({status: 200, description: "Product deleted", type: CreateProductDto})
    @ApiResponse({status: 400, description: "Cannot delete product by this ID"})
    @ApiResponse({type: Entity.Product})
    async delete(@Param('id') id: number): Promise<Product> {
        return await this.ProductService.delete(id)
    }


    @Put('/product/:id')
    @ApiResponse({status: 200, description: "Product updated", type: CreateProductDto})
    @ApiResponse({status: 400, description: "Cannot update product by this ID"})
    @ApiBody({type: UpdateProductDto})
    @ApiResponse({type: Entity.Product})
    async update(@Param('id') id: number, @Body() productDto: UpdateProductDto): Promise<Product> {
        return await this.ProductService.update(id, productDto)
    }

}