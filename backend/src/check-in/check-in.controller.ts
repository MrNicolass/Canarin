// backend/src/check-in/check-in.controller.ts
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCheckInDto } from 'src/dtos/createCheckIn.dto';
import { CheckInService } from './check-in.service';

@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleCheckIn(@Body() createCheckInDto: CreateCheckInDto) {
    return this.checkInService.createCheckIn(createCheckInDto);
  }
}
