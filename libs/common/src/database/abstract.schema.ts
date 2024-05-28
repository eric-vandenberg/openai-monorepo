import { Prop as Property, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AbstractDocument {
  @Property({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
