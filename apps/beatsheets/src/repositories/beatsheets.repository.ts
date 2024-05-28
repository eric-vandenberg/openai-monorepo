import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BeatsheetDocument } from '../models/beatsheet.schema';

@Injectable()
export class BeatsheetsRepository extends AbstractRepository<BeatsheetDocument> {
  protected readonly logger: Logger = new Logger(BeatsheetsRepository.name);

  constructor(
    @InjectModel(BeatsheetDocument.name)
    beatsheetModel: Model<BeatsheetDocument>,
  ) {
    super(beatsheetModel);
  }
}
