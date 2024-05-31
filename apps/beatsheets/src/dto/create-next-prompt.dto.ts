import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNextPromptDto {
  @ApiProperty({ default: 'system' })
  @IsString()
  @IsNotEmpty()
  role: 'system';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
