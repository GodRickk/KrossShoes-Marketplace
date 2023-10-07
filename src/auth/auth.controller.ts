import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInCustomerDto } from './dto/signIn.dto';
import { SignUpCustomerDto } from './dto/signUp.dto';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { Customer } from '@prisma/client';
// import { UserResponseDto } from '../customer/dto/user-response.dto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiBody({ type: SignInCustomerDto, description: 'user credentials' })
  @ApiResponse({status: 200, description: "OK"})
  @ApiResponse({status: 400, description: "This customer can not sign in"})
  @ApiResponse({status: 404, description: "This customer was not founds"})
  async signIn(@Body() signInCustomerDto: SignInCustomerDto) {
    const token = await this.authService.signIn(signInCustomerDto.email, signInCustomerDto.password)
    console.log(token)
    return token;
  }

  @Post('sign-up')
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({status: 201, description: "Customer created"})
  @ApiResponse({status: 400, description: "This customer can not sign up"})
  async create(@Body() signUpCustomerDto: SignUpCustomerDto): Promise<Customer> {
    const customer = await this.authService.signUp(signUpCustomerDto);
    return customer;
  }
}