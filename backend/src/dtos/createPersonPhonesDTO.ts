import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonPhonesDto {
    constructor(id?: number, phone?: string, businessPhone?: string, cellPhone?: string) {
        if (id !== undefined) {
            this.id = id;
        }
        if (phone !== undefined) {
            this.phone = phone;
        }
        if (businessPhone !== undefined) {
            this.businessPhone = businessPhone;
        }
    }

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    businessPhone?: string;

    @IsNotEmpty()
    @IsString()
    cellPhone: string;
}