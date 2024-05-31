import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class ActDocument extends AbstractDocument {
  @Property({ type: String, required: true })
  description: string;

  @Property({ type: Number, required: true })
  duration: number;

  @Property({ type: String, required: true })
  cameraAngle: string;
}

export const ActSchema = SchemaFactory.createForClass(ActDocument);
