import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Order, OrderDocument } from './schema/order.schema';
import { CreateOrderDto } from './dto/order.dto';


@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private configService: ConfigService,
    ) { }

    async create(createOrderDto: CreateOrderDto, userId: string, userEmail?: string) {
        // 1. Création de la commande en base
        const order = await this.orderModel.create({
            ...createOrderDto,
            status: 'pending',
            userId: userId,
        });

        // 2. Configuration des infos client
        const customerEmail = userEmail || 'test@example.com';
        const customerName = 'Bubble';
        const customerSurname =  'Tea';

        // 3. Construction des données à envoyer à CinetPay
        const paymentData = {
            transaction_id: order._id?.toString(),
            amount: order.total,
            currency: 'XOF',
            channels: 'ALL',
            description: 'Paiement Bubble Tea',
            customer_name: customerName,
            customer_surname: customerSurname,
            customer_email: customerEmail,
            notify_url: 'https://ton-backend.com/orders/callback',
            return_url: 'https://ton-frontend.com/payment-success',
            apikey: this.configService.get<string>('CINETPAY_APIKEY'),
            site_id: this.configService.get<string>('CINETPAY_SITE_ID'),
        };

        try {
            const response = await axios.post(
                'https://api-checkout.cinetpay.com/v2/payment',
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            // 4. Retour de la commande + URL de paiement
            return {
                order,
                payment_url: response.data?.data?.payment_url || null,
                cinetpay_response: response.data,
            };
        } catch (error) {
            console.error('CinetPay ERROR:', error.response?.data || error.message);
            return {
                order,
                payment_url: null,
                cinetpay_response: error.response?.data || error.message,
            };
        }
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


    async handleCinetPayCallback(data: any) {
        const transactionId = data.transaction_id;
        const result = data.cpm_result; // "00" = succès

        if (!transactionId) {
            return { message: 'Transaction ID manquant' };
        }

        const status = result === '00' ? 'paid' : 'failed';

        const updatedOrder = await this.orderModel.findByIdAndUpdate(
            transactionId,
            { status },
            { new: true },
        );

        if (!updatedOrder) {
            return { message: 'Commande non trouvée', success: false };
        }

        return { message: `Commande mise à jour: ${status}`, success: true };
      }

}
