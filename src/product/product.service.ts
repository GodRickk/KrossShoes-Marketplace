import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, PrismaClient, Product } from "@prisma/client";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { connect } from 'http2';

@Injectable()
export class ProductService {
  prisma = new PrismaClient()


  async findById (id : number): Promise<Product> {
    
    const product = this.prisma.product.findFirst({
      where: {
        AND: [
          {id: BigInt(id)}
        ]
      }
    })

    if(!product) {
      throw new NotFoundException("Product Not Founded")
    }
    return product;
  }

  async getAllProducts (): Promise<Product[]> {
    return this.prisma.product.findMany({})
  }

  async findBySizeId (size_to_search: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        AND: [
          {size: +size_to_search}
        ]
      }
    })
  }

  async saveProduct(productDto: CreateProductDto): Promise<Product> {
    let product = await this.prisma.product.create({
      data: {
        amount: productDto.amount,
        size: productDto.size,
        price: productDto.price,
        name: productDto.name,
        /*изменить файл призма схемы у продукта на order Order?*/
        /*чтобы при создании продукта условие наличия заказа было необязательно*/
      }
    })
    return product
  }

  async saveProductToOrder(productDto: CreateProductDto): Promise<Product> {
    let product = await this.prisma.product.create({
      data: {
        amount: productDto.amount,
        size: productDto.size,
        price: productDto.price,
        name: productDto.name,
        order: {connect: {id: Number(productDto.order_id)}}
        /*изменить файл призма схемы у продукта на order Order?*/
        /*чтобы при создании продукта условие наличия заказа было необязательно*/
      },
      include: {
        order: true
      }
    })
    return product
  }

  async delete(id: number): Promise<Product> {
    let product = await this.prisma.product.delete({
      where: {
        id: BigInt(id)
      },
    })

    if(!product) {
      throw new NotFoundException("Product Not Founded")
    }
    return product
  }

  async update (id : number, productDto: UpdateProductDto): Promise<Product> {
    let product = this.prisma.product.update({
      where: {id: BigInt(id)},
      data: {
        amount: productDto.amount,
        size: productDto.size,
        price: productDto.price,
        name: productDto.name
      }
    })
    return product
  }
}