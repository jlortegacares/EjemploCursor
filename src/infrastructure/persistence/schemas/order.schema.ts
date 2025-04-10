import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { OrderStatus } from '../../../domain/entities/order.entity';

@Schema({ timestamps: true })
export class OrderSchema extends Document {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  totalAmount: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchemaFactory = SchemaFactory.createForClass(OrderSchema); 