// backend/src/check-in/check-in.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCheckInDto } from 'src/dtos/createCheckIn.dto';

@Injectable()
export class CheckInService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new location history record for a user.
   * Timestamps are automatically stored in UTC by Prisma.
   * @param data - The check-in data containing user ID and location info.
   * @returns The newly created location history record.
   */
  async createCheckIn(data: CreateCheckInDto) {
    try {
      const locationRecord = await this.prisma.locationHistory.create({
        data: {
          userId: data.userId,
          latitude: data.latitude,
          longitude: data.longitude,
          street: data.street,
          neighborhood: data.city, // Note: using city for neighborhood as per user's sample logic
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          // timestamp is handled by @default(now())
        },
      });
      return locationRecord;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Failed to create check-in record:', error);
      // Throw a standard NestJS exception
      throw new InternalServerErrorException('Could not save the location.');
    }
  }
}
