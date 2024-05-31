import { Prop as Property, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types, now } from 'mongoose';

@Schema({ timestamps: true })
export class AbstractDocument {
  @Property({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Property({ default: now() })
  createdAt: Date;

  @Property({ default: now() })
  updatedAt: Date;
}
