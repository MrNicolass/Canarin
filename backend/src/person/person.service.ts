import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePersonDto } from 'src/dtos/createPersonDTO';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async createPerson(personData: CreatePersonDto): Promise<any> {
    try {
      const person = await this.prisma.person.create({
        data: {
          cpf: personData.cpf,
          rg: personData.rg,
          name: personData.name,
          lastName: personData.lastName,
          email: personData.email,
          birthDate: personData.birthDate,
          phonesId: 1,
        },
      });

      if (person) {
        return 'Usuário criado com sucesso!';
      } else {
        throw new Error('Usuário não criado!');
      }
    } catch (e) {
      console.error(e);
    }
  }
}
