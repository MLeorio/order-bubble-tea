import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
    private baseUrl = 'https://app.paydunya.com/api/v1/checkout-invoice/create';
    private headers = {
        'Content-Type': 'application/json',
        'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY,
        'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY,
        'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN,
        'PAYDUNYA-MODE': 'test',
    };

    async createInvoice(amount: number, description: string, customerEmail: string) {
        const data = {
            invoice: {
                items: [
                    {
                        name: 'Commande Bubble Tea',
                        quantity: 1,
                        unit_price: amount,
                        total_price: amount,
                        description,
                    },
                ],
                total_amount: amount,
                description,
            },
            store: {
                name: 'Bubble Tea',
                tagline: 'Bubble Tea Commande',
                phone: '22890123456',
                postal_address: 'Lomé, Togo',
                website_url: 'https://bubbletea.tg',
            },
            actions: {
                callback_url: 'http://localhost:3000/orders/callback',
                cancel_url: 'http://localhost:3000/orders/cancel',
                return_url: 'http://localhost:3000/orders/success',
            },
            custom_data: {
                customer_email: customerEmail,
            },
        };

        const response = await axios.post(this.baseUrl, data, { headers: this.headers });
        return response.data;
    }
}
