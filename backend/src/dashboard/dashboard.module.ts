// backend/src/dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DatabaseModule } from 'src/database/prisma/database.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, HttpModule, ConfigModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
