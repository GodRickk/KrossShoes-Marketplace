import { IsNotEmpty } from 'class-validator';
import { Customer } from './customer';
import { ApiProperty } from '@nestjs/swagger';

export class Review {
  @ApiProperty({ type: BigInt })
  id: bigint;

  @ApiProperty({ type: () => Customer })
  customer: Customer;

  @ApiProperty({ type: BigInt })
  @IsNotEmpty()
  customer_id: bigint;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  publication_date: Date;
}
