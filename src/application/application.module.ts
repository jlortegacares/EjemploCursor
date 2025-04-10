import { Module } from '@nestjs/common';
import { CustomerController } from '../infrastructure/controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class ApplicationModule {}
