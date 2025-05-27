// ---- REGISTER DTO ----
import { IsEmail, IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Prénom requis' })
    firstName: string;

    @IsNotEmpty({ message: 'Nom requis' })
    lastName: string;

    @IsEmail({}, { message: 'Email invalide' })
    @IsNotEmpty({ message: 'Email requis' })
    email: string;

    @IsNotEmpty({ message: 'Mot de passe requis' })
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
    })
    password: string;

    @IsOptional()
    @Matches(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Numéro de téléphone invalide' })
    phone?: string;
}