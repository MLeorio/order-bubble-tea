// 12. Schéma produit (products/product.schema.ts)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    basePrice: number;

    @Prop({ type: [String], default: [] })
    sizes: string[];

    @Prop({ type: [String], default: [] })
    toppings: string[];

    @Prop({ default: true })
    available: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

