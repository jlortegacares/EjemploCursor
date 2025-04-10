import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationModule } from './application/application.module';
import { CustomerService } from './application/services/customer.service';
import { CustomerController } from './infrastructure/controllers/customer.controller';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/hexagonal-db'),
    ApplicationModule,
    PersistenceModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class AppModule {}
