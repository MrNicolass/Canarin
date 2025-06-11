import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PersonModule } from 'src/person/person.module';
import { DatabaseModule } from 'src/database/database.module';
import { PersonService } from 'src/person/person.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, PersonService]
})

export class UsersModule {}