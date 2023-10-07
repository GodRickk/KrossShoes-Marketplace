import { Injectable } from '@nestjs/common';
import { Customer, PrismaClient } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  prisma = new PrismaClient()

  async findById (id_tofind : number): Promise<Customer> {
    const customer =  this.prisma.customer.findFirst({
      where: {
        AND: [
          {id: BigInt(id_tofind)}
        ]
      }
    })
    return customer
  }

  async getAllCustomers (): Promise<Customer[]> {
    return this.prisma.customer.findMany({})
  }

  async findByEmail (email_to_find : string): Promise<Customer> {
    return this.prisma.customer.findFirst({
      where: {
        AND: [
          {email: email_to_find}
        ]
      }
    })
  }

  async saveCustomer(customerDto: CreateCustomerDto): Promise<Customer> {
    let customer = await this.prisma.customer.create({
      data: {
        email: customerDto.email,
        password: customerDto.password,
        name: customerDto.name,
        surname: customerDto.surname,
        phone_number: customerDto.phone_number
      }
    })
    return customer
  }

  async delete(id: number): Promise<Customer> {
    let customer = await this.prisma.customer.delete({
      where: {
        id: BigInt(id)
      },
    })
    return customer
  }

  
}
