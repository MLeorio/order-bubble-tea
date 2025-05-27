// src/payment/payment.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPayment(
        @Body() body: { amount: number; email: string },
    ) {
        return this.paymentService.initTransaction(body.amount, body.email);
    }
}
