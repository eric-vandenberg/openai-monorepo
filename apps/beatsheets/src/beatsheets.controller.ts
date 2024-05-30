import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Post(':id/beat/:beatId/act')
  @ApiOperation({ summary: 'Add a new act to a specific beat' })
  @ApiTags('acts')
  @UseGuards(JwtAuthGuard)
  async createAct(
    @Param('id') id: string,
    @Param('beatId') beatId: string,
    @Body() createActDto: CreateActDto,
  ) {
    const beatsheet = await this.beatsheetsService.findOne(id);
    const beat = await this.beatsService.findOne(beatId);

    if (
      beatsheet &&
      beat &&
      beatsheet.beats.some((objId) => objId.toHexString() === beatId)
    ) {
      const act = await this.actsService.create(createActDto);

      beat.acts.push(act._id);

      await this.beatsService.update(beatId, beat);

      return act;
    }

    throw new BadRequestException(
      `Cannot create act for beatsheet id ${beatsheet._id} and beat id ${beat._id}`,
    );
  }

  @Put(':id/beat/:beatId/act/:actId')
  @ApiOperation({ summary: 'Update an act in a specific beat' })
  @ApiTags('acts')
  @UseGuards(JwtAuthGuard)
  async updateAct(
    @Param('id') id: string,
    @Param('beatId') beatId: string,
    @Param('actId') actId: string,
    @Body() updateActDto: UpdateActDto,
  ) {
    const beatsheet = await this.beatsheetsService.findOne(id);
    const beat = await this.beatsService.findOne(beatId);
    const act = await this.actsService.findOne(actId);

    if (
      beatsheet &&
      beat &&
      act &&
      beatsheet.beats.some((objId) => objId.toHexString() === beatId) &&
      beat.acts.some((objId) => objId.toHexString() === actId)
    ) {
      return this.actsService.update(actId, updateActDto);
    }

    throw new BadRequestException(
      `Cannot update act for beatsheet id ${beatsheet._id} and beat id ${beat._id} and act id ${act._id}`,
    );
  }

  @Delete(':id/beat/:beatId/act/:actId')
  @ApiOperation({ summary: 'Delete an act from a specific beat' })
  @ApiTags('acts')
  @UseGuards(JwtAuthGuard)
  async removeAct(
    @Param('id') id: string,
    @Param('beatId') beatId: string,
    @Param('actId') actId: string,
  ) {
    const beatsheet = await this.beatsheetsService.findOne(id);
    const beat = await this.beatsService.findOne(beatId);
    const act = await this.actsService.findOne(actId);

    if (
      beatsheet &&
      beat &&
      act &&
      beatsheet.beats.some((objId) => objId.toHexString() === beatId) &&
      beat.acts.some((objId) => objId.toHexString() === actId)
    ) {
      await this.actsService.remove(actId);

      beat.acts = beat.acts.filter((objId) => objId.toHexString() !== actId);

      await this.beatsService.update(beatId, beat);

      return act;
    }

    throw new BadRequestException(
      `Cannot delete act for beatsheet id ${beatsheet._id} and beat id ${beat._id} and act id ${act._id}`,
    );
  }

  @Post(':id/beat')
  @ApiOperation({ summary: 'Add a new beat to a specific beatsheet' })
  @ApiTags('beats')
  @UseGuards(JwtAuthGuard)
  async createBeat(
    @Param('id') id: string,
    @Body() createBeatDto: CreateBeatDto,
  ) {
    const beatsheet = await this.beatsheetsService.findOne(id);

    if (beatsheet) {
      const beat = await this.beatsService.create(createBeatDto);

      beatsheet.beats.push(beat._id);

      await this.beatsheetsService.update(id, beatsheet);

      return beat;
    }

    throw new BadRequestException(
      `Cannot create beat for beatsheet id ${beatsheet._id}`,
    );
  }

  @Put(':id/beat/:beatId')
  @ApiOperation({ summary: 'Update a beat in a specific beatsheet' })
  @ApiTags('beats')
  @UseGuards(JwtAuthGuard)
  async updateBeat(
    @Param('id') id: string,
    @Param('beatId') beatId: string,
    @Body() updateBeatDto: UpdateBeatDto,
  ) {
    const beatsheet = await this.beatsheetsService.findOne(id);
    const beat = await this.beatsService.findOne(beatId);

    if (
      beatsheet &&
      beat &&
      beatsheet.beats.some((objId) => objId.toHexString() === beatId)
    ) {
      return this.beatsService.update(id, updateBeatDto);
    }

    throw new BadRequestException(
      `Cannot delete beat for beatsheet id ${beatsheet._id} and beat id ${beat._id}`,
    );
  }

  @Delete(':id/beat/:beatId')
  @ApiOperation({ summary: 'Delete a beat from a specific beatsheet' })
  @ApiTags('beats')
  @UseGuards(JwtAuthGuard)
  async removeBeat(@Param('id') id: string, @Param('beatId') beatId: string) {
    const beatsheet = await this.beatsheetsService.findOne(id);
    const beat = await this.beatsService.findOne(beatId);

    if (
      beatsheet &&
      beat &&
      beatsheet.beats.some((objId) => objId.toHexString() === beatId)
    ) {
      await this.beatsService.remove(beatId);

      beatsheet.beats = beatsheet.beats.filter(
        (objId) => objId.toHexString() !== beatId,
      );

      await this.beatsheetsService.update(beatId, beatsheet);

      return beat;
    }

    throw new BadRequestException(
      `Cannot delete beat for beatsheet id ${beatsheet._id} and beat id ${beat._id}`,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new beatsheet' })
  @ApiTags('beatsheets')
  @UseGuards(JwtAuthGuard)
  async createBeatsheet(
    @Body() createBeatsheetDto: CreateBeatsheetDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.beatsheetsService.create(createBeatsheetDto, user._id);
  }

  @Get()
  @ApiOperation({ summary: 'List all beatsheets' })
  @ApiTags('beatsheets')
  @UseGuards(JwtAuthGuard)
  async findAllBeatsheets() {
    return this.beatsheetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a beatsheet by its ID' })
  @ApiTags('beatsheets')
  @UseGuards(JwtAuthGuard)
  async findOneBeatsheet(@Param('id') id: string) {
    return this.beatsheetsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a beatsheet by its ID' })
  @ApiTags('beatsheets')
  @UseGuards(JwtAuthGuard)
  async updateBeatsheet(
    @Param('id') id: string,
    @Body() updateBeatsheetDto: UpdateBeatsheetDto,
  ) {
    return this.beatsheetsService.update(id, updateBeatsheetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a beatsheet by its ID' })
  @ApiTags('beatsheets')
  @UseGuards(JwtAuthGuard)
  async removeBeatsheet(@Param('id') id: string) {
    return this.beatsheetsService.remove(id);
  }
}
