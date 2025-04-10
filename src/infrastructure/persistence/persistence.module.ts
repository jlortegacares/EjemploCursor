import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerRepository } from './repositories/customer.repository';
import { OrderRepository } from './repositories/order.repository';
import { CustomerSchema } from './schemas/customer.schema';
import { OrderSchema, OrderSchemaFactory } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Order', schema: OrderSchemaFactory },
    ]),
  ],
  providers: [CustomerRepository, OrderRepository],
  exports: [CustomerRepository, OrderRepository],
})
export class PersistenceModule {}
