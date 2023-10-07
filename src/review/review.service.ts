import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  prisma = new PrismaClient()

  async findById (id : number): Promise<Review> {
    let review = this.prisma.review.findFirst({
      where: {
        AND: [
          {id: BigInt(id)}
        ]
      }
    })

    if(!review) {
      throw new NotFoundException("Review Not Founded")
    }

    return review
  }

  async getAllReviews(): Promise<Review[]> {
    return this.prisma.review.findMany()
  }

  async findByCustomerId (id : number): Promise<Review[]> {
    let reviews = this.prisma.review.findMany({
      where: {
        AND: [
          {customer_id: BigInt(id)}
        ]
      }
    })

    return reviews
  }

  async saveReview(reviewDto: CreateReviewDto): Promise<Review> {
    let review = await this.prisma.review.create({
      data: {
        customer: {connect: {id: BigInt(reviewDto.customer_id)}},
        text: reviewDto.text,
      }
    })
    return review
  }

  async delete(id: number): Promise<Review> {
    let review = await this.prisma.review.delete({
      where: {
        id: BigInt(id)
      },
    })

    if (review == null) {
      throw new NotFoundException('Review Not Founded');
    }

    return review;
  }

  async deleteAll() {
    await this.prisma.review.deleteMany({})
  }

}