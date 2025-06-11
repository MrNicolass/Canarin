import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/prisma/database.module';
import { PersonModule } from './person/person.module';
import { CheckInModule } from './check-in/check-in.module';

@Module({
  imports: [UsersModule, DatabaseModule, PersonModule, CheckInModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
