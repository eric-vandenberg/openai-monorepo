import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ActDocument } from '../models/act.schema';

@Injectable()
export class ActsRepository extends AbstractRepository<ActDocument> {
  protected readonly logger: Logger = new Logger(ActsRepository.name);

  constructor(
    @InjectModel(ActDocument.name)
    actModel: Model<ActDocument>,
  ) {
    super(actModel);
  }
}
