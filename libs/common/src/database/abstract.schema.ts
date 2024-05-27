import { Prop as Property, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Property({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
