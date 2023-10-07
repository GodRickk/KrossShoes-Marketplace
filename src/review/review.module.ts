import { Controller, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, CustomerService],
  exports: [ReviewService, CustomerService],
})
export class ReviewModule {}