// 4. Contrôleur (auth.controller.ts)
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Get('admin')
    getAdminRoute() {
        return { message: 'Admin only' };
    }

    @Get()
    getHello() {
        return 'Hello from AuthController!';
    }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}