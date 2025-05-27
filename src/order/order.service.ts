// 3. Service de commande (orders/order.service.ts)
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) { }

    create(dto: CreateOrderDto, userId: string) {
        return this.orderModel.create({ ...dto, userId });
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
