import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PromptDocument } from '../models/prompt.schema';

@Injectable()
export class PromptsRepository extends AbstractRepository<PromptDocument> {
  protected readonly logger: Logger = new Logger(PromptsRepository.name);

  constructor(
    @InjectModel(PromptDocument.name)
    promptModel: Model<PromptDocument>,
  ) {
    super(promptModel);
  }
}
