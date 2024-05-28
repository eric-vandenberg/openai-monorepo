import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateBeatsheetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  beats: Types.ObjectId[];
}