import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { CreatePersonPhonesDto } from "./createPersonPhonesDTO";

export class CreatePersonDto {

    constructor(
        id?: number,
        cpf?: string,
        rg?: string,
        name?: string,
        lastName?: string,
        birthDate?: string,
        email?: string,
        phones?: CreatePersonPhonesDto,
    ) {
        if (id !== undefined) {
            this.id = id;
        }
        if (cpf !== undefined) {
            this.cpf = cpf;
        }
        if (rg !== undefined) {
            this.rg = rg;
        }
        if (name !== undefined) {
            this.name = name;
        }
        if (lastName !== undefined) {
            this.lastName = lastName;
        }
        if (birthDate !== undefined) {
            this.birthDate = birthDate;
        }
        if (email !== undefined) {
            this.email = email;
        }
        if (phones !== undefined) {
            this.phones = phones;
        }
    }

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

    @IsOptional()
    @IsObject()
    phones?: CreatePersonPhonesDto;
}