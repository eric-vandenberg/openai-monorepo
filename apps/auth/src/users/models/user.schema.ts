import { Prop as Property, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Property()
  email: string;

  @Property()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
