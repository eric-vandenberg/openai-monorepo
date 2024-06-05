import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

import { CreateNextPromptDto } from '../dto/create-next-prompt.dto';
import { OpenaiService } from '../services/openai.service';

@Controller('openai/prompt')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  @ApiOperation({ summary: 'Create a prompt' })
  @ApiTags('openai')
  @UseGuards(JwtAuthGuard)
  async createPrompt(@Body() createNextPromptDto: CreateNextPromptDto) {
    return this.openaiService.createPrompt(createNextPromptDto);
  }

  @Get(':promptId')
  @ApiOperation({ summary: 'Get a prompt' })
  @ApiTags('openai')
  @UseGuards(JwtAuthGuard)
  async findOnePrompt(@Param('promptId') promptId: string) {
    return this.openaiService.findOnePrompt(promptId);
  }
}
