import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Property({ type: String, required: true })
  email: string;

  @Property({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
