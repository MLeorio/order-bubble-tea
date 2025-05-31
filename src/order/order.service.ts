// 3. Service de commande (orders/order.service.ts)
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { CreateOrderDto } from './dto/order.dto';
import axios from 'axios';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private readonly paymentService: PaymentService,
    ) { }

    async create(dto: CreateOrderDto, userId: string, userEmail: string) {
        const order = await this.orderModel.create({ ...dto, userId });
        

        console.log(JSON.stringify({
            transaction: {
                amount: order.total,
                description: 'Paiement Bubble Tea',
                currency: 'XOF',
                callback_url: 'http://localhost:3000/orders/callback',
            },
            customer: {
                first_name: 'Bubble',
                last_name: 'Tea',
                email: userEmail || 'default@email.com',
            },
          }));

        // const paymentResponse = await axios.post(
        //     'https://sandbox-api.fedapay.com/v1/transactions',
        //     {
        //         "transaction": {
        //             "amount": 3600,
        //             "description": "Paiement Bubble Tea",
        //             "currency": {
        //                 "id": 1,
        //                 "name": "FCFA",
        //                 "iso": "XOF",
        //                 "code": 952,
        //                 "prefix": null,
        //                 "suffix": "CFA",
        //                 "div": 1,
        //                 "default": true,
        //                 "modes": [
        //                     "moov",
        //                     "moov_tg",
        //                     "togocel",
        //                     "ecobank_tpe",
        //                     "orabank_tpe",
        //                     "uba",
        //                     "my_feda",
        //                 ]
        //             },
        //             "callback_url": "http://localhost:3000/orders/callback"
        //         },
        //         "customer": {
        //             "firstname": "Bubble",
        //             "lastname": "Tea",
        //             "email": "eafanou1@gmail.com"
        //         }
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${process.env.FEDAPAY_SECRET_KEY}`,
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             'X-Requested-With': 'XMLHttpRequest',
        //         },
        //     }
        // );

        const payload = JSON.stringify({
            transaction: {
                amount: order.total,
                description: 'Paiement Bubble Tea',
                currency: 'XOF',
                callback_url: 'http://localhost:3000/orders/callback',
            },
            customer: {
                first_name: 'Bubble',
                last_name: 'Tea',
                email: userEmail || 'default@email.com',
            },
        });

        const paymentResponse = await axios.post(
            'https://sandbox-api.fedapay.com/v1/transactions',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${process.env.FEDAPAY_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );
          

        return {
            order,
            // payment: paymentResponse.data,
        };
    }

    findAll() {
        return this.orderModel.find().populate('userId').sort({ createdAt: -1 });
    }

    findUserOrders(userId: string) {
        return this.orderModel.find({ userId }).sort({ createdAt: -1 });
    }

    updateStatus(id: string, status: string) {
        return this.orderModel.findByIdAndUpdate(id, { status }, { new: true });
    }

    findById(id: string) {
        return this.orderModel.findById(id).populate('userId');
    }
}
