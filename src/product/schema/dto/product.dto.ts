// 13. DTOs produits (products/product.dto.ts)
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    image: string;

    @IsNumber()
    basePrice: number;

    @IsArray()
    sizes: string[];

    @IsArray()
    toppings: string[];

    @IsBoolean()
    available: boolean;
}
