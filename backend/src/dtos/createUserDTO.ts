import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { CreatePersonDto } from "./createPersonDTO";

export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    userTypeId: number;
    
    @IsOptional()
    @IsObject()
    person?: CreatePersonDto;
    
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}