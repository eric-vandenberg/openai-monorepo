import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from '@app/common';

import { ActDocument } from './act.schema';

@Schema({ versionKey: false })
export class BeatDocument extends AbstractDocument {
  @Property({ type: String, required: true })
  description: string;

  @Property({
    type: [{ type: Types.ObjectId, ref: ActDocument.name, autopopulate: true }],
  })
  acts: Types.ObjectId[];
}

export const BeatSchema = SchemaFactory.createForClass(BeatDocument);
