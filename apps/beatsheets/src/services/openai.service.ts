import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionMessageParam } from 'openai/resources';
import OpenAI from 'openai';

import { CreateNextPromptDto } from '../dto/create-next-prompt.dto';
import { BeatsheetsRepository } from '../repositories/beatsheets.repository';
import { PromptsRepository } from '../repositories/prompts.repository';
import { BeatDocument } from '../models/beat.schema';
import { ActDocument } from '../models/act.schema';

@Injectable()
export class OpenaiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly openai: OpenAI,
    private readonly promptsRepository: PromptsRepository,
    private readonly beatsheetRepository: BeatsheetsRepository,
  ) {}

  createPrompt(createNextPromptDto: CreateNextPromptDto) {
    return this.promptsRepository.create({
      ...createNextPromptDto,
    });
  }

  findOnePrompt(_id: string, lean: boolean = true) {
    return this.promptsRepository.findOne({ _id }, lean);
  }

  async suggestNext(promptId: string, _id: string) {
    const beatsheet = await this.beatsheetRepository.findOne({ _id }, false);
    const lastBeat = beatsheet.beats.pop() as unknown as BeatDocument;

    if (!lastBeat) {
      throw new BadRequestException(`No beats found for beatsheet id ${_id}`);
    }

    const orderedActs = lastBeat.acts.reduce((accm: string, act, i: number) => {
      return (
        accm + `${i + 1}. ${(act as unknown as ActDocument).description}. `
      );
    }, '');

    const prompt = await this.promptsRepository.findOne({ _id: promptId });

    if (!prompt) {
      throw new NotFoundException(`Prompt not found for id ${promptId}`);
    }

    const messages: ChatCompletionMessageParam[] = [
      {
        role: prompt.role,
        content: prompt.content,
      },
      {
        role: 'system',
        content: `Consider the title of the beat sheet before suggesting the next beat. The title is ${beatsheet.title}`,
      },
      {
        role: 'user',
        content: `The previous beat was ${lastBeat.description} which included these act(s): ${orderedActs}. Provide the next beat with one or more acts.`,
      },
    ];

    return this.openai.chat.completions.create({
      messages,
      model: this.configService.get('OPENAI_MODEL'),
    });
  }
}
