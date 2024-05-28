import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BeatDocument } from '../models/beat.schema';

@Injectable()
export class BeatsRepository extends AbstractRepository<BeatDocument> {
  protected readonly logger: Logger = new Logger(BeatsRepository.name);

  constructor(
    @InjectModel(BeatDocument.name)
    beatModel: Model<BeatDocument>,
  ) {
    super(beatModel);
  }
}
