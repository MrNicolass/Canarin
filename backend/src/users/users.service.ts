import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from 'src/dtos/createUserDTO';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private personService: PersonService) {}

    async createUser(userData: CreateUserDto): Promise<any> {


        const user = await this.prisma.user.create({
            data: {
                login: userData.login,
                password: userData.password,
                userTypeId: Number(userData.userTypeId),
                personId: 1,
                active: true
            }
        });

        return `Usuário ${user.id} criado!`
    }
}