import { FilterQuery, Model, Types, UpdateQuery, now } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(
    document: Omit<TDocument, '_id' | 'updatedAt' | 'createdAt'>,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    lean: boolean = true,
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(lean);

    if (!document) {
      this.logger.warn('Document not found with filter query: ', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    lean: boolean = true,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(
        filterQuery,
        { ...update, updatedAt: now() },
        {
          new: true,
          upsert: true,
        },
      )
      .lean<TDocument>(lean);

    if (!document) {
      this.logger.warn('Document not found with filter query: ', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
    lean: boolean = true,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(lean);
  }
}
