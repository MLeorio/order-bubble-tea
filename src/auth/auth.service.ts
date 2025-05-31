// 3. Service (auth.service.ts)
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existing = await this.userModel.findOne({ email: dto.email });
        if (existing) throw new UnauthorizedException('Email déjà utilisé');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.userModel.create({ ...dto, password: hashed });
        if (!user) throw new UnauthorizedException('Erreur lors de l\'inscription');

        return this.signToken(user);
    }

    async login(dto: LoginDto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Identifiants invalides');
        }
        return this.signToken(user);
    }

    private signToken(user: UserDocument) {
        const payload = { sub: user._id, role: user.role, email: user.email, firstname: user.firstName, lastname: user.lastName };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}