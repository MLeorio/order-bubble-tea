// src/payment/payment.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
    private readonly baseUrl = 'https://sandbox-api.fedapay.com/v1'; // change to prod URL in prod

    private getHeaders() {
        const key = process.env.FEDAPAY_SECRET_KEY;
        if (!key) throw new InternalServerErrorException('Missing FedaPay secret key');
        return {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        };
    }

    async initTransaction(amount: number, email: string) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/transactions`,
                {
                    transaction: {
                        amount,
                        description: 'Paiement Bubble Tea',
                        currency: 8,
                    },
                    customer: {
                        email,
                    },
                },
                {
                    headers: this.getHeaders(),
                },
            );

            return response.data;
        } catch (error) {
            console.error('FedaPay error:', error.response?.data || error.message);
            throw new InternalServerErrorException('Erreur de communication avec FedaPay');
        }
    }
}
