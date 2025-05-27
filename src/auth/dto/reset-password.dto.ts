// ---- RESET PASSWORD DTO ----
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsEmail({}, { message: 'Email invalide' })
    @IsNotEmpty({ message: 'Email requis' })
    email: string;
}

export class ConfirmResetPasswordDto {
    @IsNotEmpty({ message: 'Token requis' })
    token: string;

    @IsNotEmpty({ message: 'Nouveau mot de passe requis' })
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    newPassword: string;
}