import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from '@app/common';

import { BeatDocument } from './beat.schema';

@Schema({ versionKey: false })
export class BeatsheetDocument extends AbstractDocument {
  @Property({ type: String, required: true })
  title: string;

  @Property({ type: String, required: true })
  userId: string;

  @Property({
    type: [
      { type: Types.ObjectId, ref: BeatDocument.name, autopopulate: true },
    ],
  })
  beats: Types.ObjectId[];
}

export const BeatsheetSchema = SchemaFactory.createForClass(BeatsheetDocument);
