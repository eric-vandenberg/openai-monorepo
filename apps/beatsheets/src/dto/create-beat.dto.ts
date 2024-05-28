import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateBeatDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  acts: Types.ObjectId[];
}
