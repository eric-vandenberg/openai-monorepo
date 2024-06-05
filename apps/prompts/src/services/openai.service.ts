import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionMessageParam } from 'openai/resources';
import OpenAI from 'openai';

import { CreateNextPromptDto } from '../dto/create-next-prompt.dto';
import { PromptsRepository } from '../repositories/prompts.repository';

@Injectable()
export class OpenaiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly openai: OpenAI,
    private readonly promptsRepository: PromptsRepository,
  ) {}

  createPrompt(createNextPromptDto: CreateNextPromptDto) {
    return this.promptsRepository.create({
      ...createNextPromptDto,
    });
  }

  findOnePrompt(_id: string, lean: boolean = true) {
    return this.promptsRepository.findOne({ _id }, lean);
  }

  async suggestNext(promptId: string) {
    const prompt = await this.promptsRepository.findOne({ _id: promptId });

    if (!prompt) {
      throw new NotFoundException(`Prompt not found for id ${promptId}`);
    }

    const messages: ChatCompletionMessageParam[] = [
      {
        role: prompt.role,
        content: prompt.content,
      },
    ];

    return this.openai.chat.completions.create({
      messages,
      model: this.configService.get('OPENAI_MODEL'),
    });
  }

  // create(dto: Dto, userId: string) {

  // }

  // findAll() {

  // }

  // findOne(_id: string, lean: boolean = true) {

  // }

  // updateOne(_id: string, dto: Dto) {

  // }

  // removeOne(_id: string) {

  // }
}
