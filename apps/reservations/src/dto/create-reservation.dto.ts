import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
