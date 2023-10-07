import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    amount: bigint;
  
    @ApiProperty()
    @IsNotEmpty()
    price: number;
  
    @ApiProperty()
    @IsNotEmpty()
    size: number;
  
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  }