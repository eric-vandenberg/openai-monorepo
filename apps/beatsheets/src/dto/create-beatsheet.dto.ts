import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBeatsheetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsArray()
  @Type(() => Types.ObjectId)
  beats: Types.ObjectId[];
}
