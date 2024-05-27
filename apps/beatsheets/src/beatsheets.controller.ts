import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BeatsheetsService } from './beatsheets.service';
import { CreateBeatsheetDto } from './dto/create-beatsheet.dto';
import { UpdateBeatsheetDto } from './dto/update-beatsheet.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('beatsheets')
export class BeatsheetsController {
  constructor(private readonly beatsheetsService: BeatsheetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBeatsheetDto: CreateBeatsheetDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.beatsheetsService.create(createBeatsheetDto, user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.beatsheetsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.beatsheetsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBeatsheetDto: UpdateBeatsheetDto,
  ) {
    return this.beatsheetsService.update(id, updateBeatsheetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.beatsheetsService.remove(id);
  }
}
