import { Body, Controller, Delete, Get, Param, Post, Put, Render, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/transform.interceptor";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "@prisma/client";
import * as Entity from "src/_gen/prisma-class/review";
import { AuthGuard } from "src/auth/auth.guard";
import { CustomerService } from "src/customer/customer.service";

// @UseInterceptors(TransformInterceptor)
@Controller()
@ApiTags('reviews')
export class ReviewController {
    constructor(private readonly ReviewService: ReviewService, private readonly CustomerService: CustomerService) {
    }

    /*@Get('/reviews')
    @Render('reviews.hbs')
    reviews() {
    return { isLogged: true };
    }*/

    // id: 5n,
    // name: 'nenll',
    // surname: 'tutll',
    // email: 'jfu@Ret.ggt',
    // password: 'hochuZakritWebPLZ',
    // phone_number: 37892727n

    // id: 37n,
    // customer_id: 25n,
    // text: 's',
    // publication_date: 2023-09-22T14:12:27.067Z

    @Get('/reviews')
    @ApiResponse({type: Entity.Review})
    @Render('reviews.hbs')
    @ApiResponse({status: 200, description: "OK", type: Entity.Review})
    @ApiResponse({status: 400, description: "Cannot get reviews"})
    @ApiResponse({status: 404, description: "Reviews were not found"})
    async findAllReviews() /*Promise<Reviews[]>*/ {
        const reviews = await this.ReviewService.getAllReviews();
        const allCustomers = await this.CustomerService.getAllCustomers();
        // let result;
        const result = []
        for (let review of reviews) {
            const id = Number(review.customer_id);
            for (let customer of allCustomers) {
                if (Number(customer.id) === id) {
                    //console.log(customer.name)
                    const pageReview =  {
                        name: customer.name,
                        surname: customer.surname,
                        ...review
                    }
                    result.push(pageReview)
                }
            }
        }
        console.log(result)
        return {result}
    }


    // @Get('')
    // @ApiResponse({type: Entity.Review})
    // @Render('reviews.hbs')
    // async findAllReviews() /*Promise<Reviews[]>*/ {
    //     const res = await this.ReviewService.getAllReviews()
    //     console.log(res)
    //     return {res}
    // }


    @Get('/reviews/:id')
    @ApiResponse({type: Entity.Review})
    @ApiResponse({status: 200, description: "OK", type: Entity.Review})
    @ApiResponse({status: 400, description: "Cannot get review by this ID"})
    async find(@Param('id') id: number): Promise<Review> {
        return await this.ReviewService.findById(id)
    }

    @Get('/reviews/:customer_id')
    @ApiResponse({type: Entity.Review})
    async findCostomersReviews(@Param('customer_id') customer_id: number): Promise<Review[]> {
        return await this.ReviewService.findByCustomerId(customer_id)
    }

    // @Get('/reviews/:customer_id')
    // @ApiResponse({type: Entity.Review})
    // async get(@Param('customer_id') customer_id: number): Promise<Review[]> {
    //     return await this.ReviewService.findByCustomerId(customer_id)
    // }


    @Post('/reviews')
    @ApiBody({type: CreateReviewDto})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiResponse({status: 201, description: "Review Created", type: Entity.Review})
    @ApiResponse({status: 400, description: "Cannot create this review"})
    async create(@Body() reviewDto: CreateReviewDto): Promise<Review> {
        return await this.ReviewService.saveReview(reviewDto)
    }

    @Delete('/reviews/:id')
    @ApiResponse({status: 200, description: "OK", type: Entity.Review})
    @ApiResponse({status: 400, description: "Cannot delete review by this id"})
    @ApiResponse({status: 404, description: "Cannot find review by this id"})
    async delete(@Param('id') id: number): Promise<Review> {
        return await this.ReviewService.delete(id)
    }

    @Delete('/reviews')
    @ApiResponse({type: Entity.Review})
    async deleteAllReviews() {
        await this.ReviewService.deleteAll()
    }

}