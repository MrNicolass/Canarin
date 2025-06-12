import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePersonDto } from 'src/dtos/createPersonDTO';
import { CreatePersonPhonesDto } from 'src/dtos/createPersonPhonesDTO';

@Injectable()
export class PersonService {
    constructor(private prisma: PrismaService) {}

    async createPersonPhones(phonesData: CreatePersonPhonesDto, prisma?: Prisma.TransactionClient): Promise<any> {
        try {
            const prismaClient = prisma ?? this.prisma;
            const phones = await prismaClient.personPhones.create({
                data: {
                    phone: phonesData.phone,
                    businessPhone: phonesData.businessPhone,
                    cellPhone: phonesData.cellPhone
                }
            });
    
            if(phones) {
                return 'Telefones atribuídos com sucesso!';
            } else {
                throw new Error("Não foi possível atribuir os telefones!");
            }
        } catch(e) {
            throw e;
        }
    }

    async createPerson(personData: CreatePersonDto, prisma?: Prisma.TransactionClient): Promise<any> {
        try {
            if(!personData.phones) {
                throw new Error('Celular não foi cadastrado');
            }
            
            let personPhones: { id: number } | null = null;
            try {
                personPhones = await this.createPersonPhones(personData.phones, prisma);
                if (!personPhones) {
                    throw new Error('Não foi possível registrar os telefones');
                }
            } catch(e) {
                throw e;
            }

            const prismaClient = prisma ?? this.prisma;
            const person = await prismaClient.person.create({
                data: {
                    cpf: personData.cpf,
                    rg: personData.rg,
                    name: personData.name,
                    lastName: personData.lastName,
                    email: personData.email,
                    birthDate: personData.birthDate,
                    phonesId: personPhones.id,
                }
            });
    
            if(person) {
                return 'Pessoa criada com sucesso!';
            } else {
                throw new Error("Pessoa não criada!");
            }
        } catch(e) {
            throw e;
        }
    }
}