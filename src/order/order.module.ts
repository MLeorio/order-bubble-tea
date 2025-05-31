// 5. Module commandes (orders/order.module.ts)
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PaymentModule
  ],
  controllers: [OrderController],
  providers: [OrderService, PaymentModule], // Inject PaymentModule to use PaymentService
  exports: [OrderService], // Export OrderService for use in other modules
})
export class OrderModule { }
