import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePersonDto } from 'src/dtos/createPersonDTO';
import { CreateUserDto } from 'src/dtos/createUserDTO';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private personService: PersonService,
  ) {}

    async findUserByLogin(login: string): Promise<any> {
        try {
            if(!login) {
                throw new Error('Login está vazio');
            }

            const user = await this.prisma.user.findFirst({
                where: { login: login }
            });

            if(!user) {
                return false;
            }

            return user;
        } catch(e) {
            throw e;
        }
    }

    async createUser(userData: CreateUserDto): Promise<any> {
        return await this.prisma.$transaction(async (prisma) => {
            try {

                if (Object.keys(userData).length === 0) {
                    throw new Error('Sem dados para cadastro');
                } else if (!userData.login || userData.login.trim() == '' || !userData.password || userData.password.trim() == '' || !userData.person) {
                    throw new Error('Alguma das informações não foi preenchida ou há apenas um espaço digitado!');
                } 
                
                const userExists = await this.findUserByLogin(userData.login);
                if (userExists) {
                    throw new Error(`Usuário com login/e-mail ${userData.login} já existe!`);
                }
                
                if (userData.userTypeId) {
                    try {
                        userData.userTypeId = Number(userData.userTypeId);
                    } catch(e) {
                        throw new Error('Não foi possível converter o tipo do usuário');
                    }
                } else {
                    userData.userTypeId = 2;
                }
                let person: { id: number } | null = null;
                try {
                    person = await this.personService.createPerson(userData.person, prisma);
                    if (!person) {
                        throw new Error('Pessoa criada é nula');
                    }
                } catch(e) {
                    throw new Error(`Não foi possível cadastrar a pessoa: ${e}`);
                }
                
                const user = await prisma.user.create({
                    data: {
                        login: userData.login,
                        password: userData.password,
                        userTypeId: userData.userTypeId,
                        personId: person?.id,
                        active: true
                    }
                });
                
                return `Usuário ID ${user.id} criado!`;
            } catch(e) {
                throw e;
            }
        });
    }
}