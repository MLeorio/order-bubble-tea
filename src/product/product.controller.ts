
// 15. Contrôleur produits (products/product.controller.ts)
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { CreateProductDto } from './schema/dto/product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    getAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productService.findById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
        return this.productService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
