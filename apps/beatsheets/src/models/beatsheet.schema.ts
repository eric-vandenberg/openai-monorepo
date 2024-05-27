import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class BeatsheetDocument extends AbstractDocument {
  @Property()
  title: string;

  @Property()
  beats: string[];
}

export const BeatsheetSchema = SchemaFactory.createForClass(BeatsheetDocument);
