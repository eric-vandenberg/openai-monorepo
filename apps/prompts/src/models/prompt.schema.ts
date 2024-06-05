import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class PromptDocument extends AbstractDocument {
  @Property({ type: String, required: true })
  role: 'system' | 'user';

  @Property({ type: String, required: true })
  content: string;
}

export const PromptSchema = SchemaFactory.createForClass(PromptDocument);
