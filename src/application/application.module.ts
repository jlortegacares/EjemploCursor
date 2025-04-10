import { Module } from '@nestjs/common';

import { CustomerController } from '../infrastructure/controllers/customer.controller';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';

import { CustomerService } from './services/customer.service';

@Module({
  imports: [PersistenceModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class ApplicationModule {}
