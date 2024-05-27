import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BeatsheetsService } from './beatsheets.service';
import { CreateBeatsheetDto } from './dto/create-beatsheet.dto';
import { UpdateBeatsheetDto } from './dto/update-beatsheet.dto';

@Controller('beatsheets')
export class BeatsheetsController {
  constructor(private readonly beatsheetsService: BeatsheetsService) {}

  @Post()
  create(@Body() createBeatsheetDto: CreateBeatsheetDto) {
    return this.beatsheetsService.create(createBeatsheetDto);
  }

  @Get()
  findAll() {
    return this.beatsheetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beatsheetsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBeatsheetDto: UpdateBeatsheetDto,
  ) {
    return this.beatsheetsService.update(id, updateBeatsheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beatsheetsService.remove(id);
  }
}
