import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsOptional()
    @IsString()
    rg?: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}