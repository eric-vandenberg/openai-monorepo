import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @ApiProperty()
  @IsCreditCard()
  @IsNotEmpty()
  number: string;
}
