import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { PrismaClient, Customer } from '@prisma/client';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, customerPassword) {
    const customer = await this.customerService.findByEmail(email);

    if (!(await bcrypt.compare(customerPassword, customer.password))) {
      throw new UnauthorizedException();
    }

    const payload = { email: customer.email, sub: customer.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createCustomerDto.password, salt);

    return this.prisma.customer.create({
      data: {
        email: createCustomerDto.email,
        name: createCustomerDto.name,
        surname: createCustomerDto.surname,
        phone_number: createCustomerDto.phone_number,
        password: password,
      },
    });
  }
}
