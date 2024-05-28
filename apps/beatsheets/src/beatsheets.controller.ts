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
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

import { ActsService } from './services/acts.service';
import { BeatsService } from './services/beats.service';
import { BeatsheetsService } from './services/beatsheets.service';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';
import { CreateBeatDto } from './dto/create-beat.dto';
import { UpdateBeatDto } from './dto/update-beat.dto';
import { CreateBeatsheetDto } from './dto/create-beatsheet.dto';
import { UpdateBeatsheetDto } from './dto/update-beatsheet.dto';

@Controller('beatsheet')
export class BeatsheetsController {
  constructor(
    private readonly actsService: ActsService,
    private readonly beatsService: BeatsService,
    private readonly beatsheetsService: BeatsheetsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBeatsheet(
    @Body() createBeatsheetDto: CreateBeatsheetDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.beatsheetsService.create(createBeatsheetDto, user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllBeatsheets() {
    return this.beatsheetsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneBeatsheet(@Param('id') id: string) {
    return this.beatsheetsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateBeatsheet(
    @Param('id') id: string,
    @Body() updateBeatsheetDto: UpdateBeatsheetDto,
  ) {
    return this.beatsheetsService.update(id, updateBeatsheetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeBeatsheet(@Param('id') id: string) {
    return this.beatsheetsService.remove(id);
  }

  @Post(':id/beat')
  @UseGuards(JwtAuthGuard)
  async createBeat(@Body() createBeatDto: CreateBeatDto) {
    return this.beatsService.create(createBeatDto);
  }

  @Put(':id/beat/:beatId')
  @UseGuards(JwtAuthGuard)
  async updateBeat(
    @Param('beatId') id: string,
    @Body() updateBeatDto: UpdateBeatDto,
  ) {
    return this.beatsService.update(id, updateBeatDto);
  }

  @Delete(':id/beat/:beatId')
  @UseGuards(JwtAuthGuard)
  async removeBeat(@Param('beatId') id: string) {
    return this.beatsService.remove(id);
  }

  @Post(':id/beat/:beatId/act')
  @UseGuards(JwtAuthGuard)
  async createAct(@Body() createActDto: CreateActDto) {
    return this.actsService.create(createActDto);
  }

  @Put(':id/beat/:beatId/act/:actId')
  @UseGuards(JwtAuthGuard)
  async updateAct(
    @Param('actId') id: string,
    @Body() updateActDto: UpdateActDto,
  ) {
    return this.actsService.update(id, updateActDto);
  }

  @Delete(':id/beat/:beatId/act/:actId')
  @UseGuards(JwtAuthGuard)
  async removeAct(@Param('actId') id: string) {
    return this.actsService.remove(id);
  }
}
