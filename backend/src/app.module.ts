import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/prisma/database.module';
import { PersonModule } from './person/person.module';
import { CheckInModule } from './check-in/check-in.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    PersonModule,
    CheckInModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
