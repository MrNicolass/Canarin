import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [UsersModule, DatabaseModule, PersonModule],
  controllers: [],
  providers: [],
})

export class AppModule {}