import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateBeatsheetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  beats: string[];
}
