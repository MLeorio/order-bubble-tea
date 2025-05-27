// 1. Schéma utilisateur (user.schema.ts)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'user', enum: ['user', 'admin'] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
