import { PartialType } from '@nestjs/mapped-types';
import { CreateBeatsheetDto } from './create-beatsheet.dto';

export class UpdateBeatsheetDto extends PartialType(CreateBeatsheetDto) {}
