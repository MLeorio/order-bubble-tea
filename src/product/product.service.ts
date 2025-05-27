// 14. Service produits (products/product.service.ts)
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './schema/dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    create(dto: CreateProductDto) {
        return this.productModel.create(dto);
    }

    findAll() {
        return this.productModel.find();
    }

    async findById(id: string) {
        if (!id) throw new Error('Product ID is required');

        if (!/^[0-9a-fA-F]{24}$/.test(id)) throw new BadRequestException('Format de l\'ID du produit invalide');

        // Check if the product exists before returning it
        const product = await this.productModel.findById(id);
        if (!product) throw new NotFoundException("Le produit avec cet ID n'existe pas");

        return await this.productModel.findById(id);
    }

    async update(id: string, dto: Partial<CreateProductDto>) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true });
    }

    remove(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}

