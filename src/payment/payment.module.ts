// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService], // Export PaymentService for use in other modules
})
export class PaymentModule { }
