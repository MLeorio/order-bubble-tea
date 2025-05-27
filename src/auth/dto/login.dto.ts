// ---- LOGIN DTO ----
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email invalide' })
    @IsNotEmpty({ message: 'Email requis' })
    email: string;

    @IsNotEmpty({ message: 'Mot de passe requis' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    password: string;
}
