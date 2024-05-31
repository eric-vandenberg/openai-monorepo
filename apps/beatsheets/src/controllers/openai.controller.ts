import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

import { OpenaiService } from '../services/openai.service';
import { CreateNextPromptDto } from '../dto/create-next-prompt.dto';

@Controller('openai/prompt')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  @ApiOperation({ summary: 'Create a prompt to suggest next beat or act' })
  @ApiTags('openai')
  @UseGuards(JwtAuthGuard)
  async createPrompt(@Body() createNextPromptDto: CreateNextPromptDto) {
    return this.openaiService.createPrompt(createNextPromptDto);
  }

  @Get(':promptId')
  @ApiOperation({ summary: 'Get a prompt for next beat or act' })
  @ApiTags('openai')
  @UseGuards(JwtAuthGuard)
  async findOnePrompt(@Param('promptId') promptId: string) {
    return this.openaiService.findOnePrompt(promptId);
  }

  @Get(':promptId/beatsheet/:id')
  @ApiOperation({ summary: 'Get suggestion for next beat or act' })
  @ApiTags('openai')
  @UseGuards(JwtAuthGuard)
  async suggestNext(
    @Param('promptId') promptId: string,
    @Param('id') id: string,
  ) {
    return await this.openaiService.suggestNext(promptId, id);
  }
}
