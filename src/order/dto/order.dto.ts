// 2. DTOs de commande (orders/order.dto.ts)
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderItemDto {
    @IsNotEmpty()
    productId: string;

    @IsString()
    size: string;

    @IsArray()
    toppings: string[];

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CreateOrderDto {
    @IsArray()
    items: OrderItemDto[];

    @IsNumber()
    total: number;
}