import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateActDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  cameraAngle: string;
}
