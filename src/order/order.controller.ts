
// 4. Contrôleur des commandes (orders/order.controller.ts)
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorator';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateOrderDto, @Req() req) {
        return this.orderService.create(dto, req.user.sub, req.user.email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMyOrders(@Req() req) {
        return this.orderService.findUserOrders(req.user.sub);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Get()
    getAllOrders() {
        return this.orderService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.orderService.updateStatus(id, status);
    }

    @Post('cinetpay-callback')
    async handleCinetPayCallback(@Body() body: any) {
        return this.orderService.handleCinetPayCallback(body);
    }
}
  