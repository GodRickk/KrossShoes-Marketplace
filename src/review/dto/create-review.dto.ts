import {ApiProperty} from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {
    @ApiProperty()
    @IsNotEmpty()
    customer_id: bigint;

    @ApiProperty()
    @IsNotEmpty()
    text: string;
}