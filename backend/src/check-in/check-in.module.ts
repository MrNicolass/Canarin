// backend/src/check-in/check-in.module.ts
import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { DatabaseModule } from 'src/database/prisma/database.module';

@Module({
  // Import other modules that this module needs.
  // We need DatabaseModule to make PrismaService available for injection in CheckInService.
  imports: [DatabaseModule],

  // Register the controllers that belong to this module.
  controllers: [CheckInController],

  // Register the providers (services) that will be instantiated by the Nest injector.
  providers: [CheckInService],
})
export class CheckInModule {}
