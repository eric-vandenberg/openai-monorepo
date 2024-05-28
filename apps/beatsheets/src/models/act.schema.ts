import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class ActDocument extends AbstractDocument {
  @Property()
  description: string;

  @Property()
  duration: number;

  @Property()
  cameraAngle: string;
}

export const ActSchema = SchemaFactory.createForClass(ActDocument);
