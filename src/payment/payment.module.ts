// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
