// 1. Schéma de commande (orders/order.schema.ts)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({
        type: [
            {
                productId: { type: Types.ObjectId, ref: 'Product', required: true },
                size: String,
                toppings: [String],
                quantity: Number,
                price: Number,
            },
        ],
        default: [],
    })
    items: {
        productId: Types.ObjectId;
        size: string;
        toppings: string[];
        quantity: number;
        price: number;
    }[];

    @Prop({ required: true })
    total: number;

    @Prop({ default: 'pending', enum: ['pending', 'paid', 'cancelled'] })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

