import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type LocationHistory = {
  id: number;
  userId: number;
  latitude: number;
  longitude: number;
  timestamp: Date;
};
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GoogleDirectionsResponse {
  routes: {
    legs: {
      distance: {
        value: number;
      };
    }[];
  }[];
}

export interface CheckInsByUserInput {
  [userId: number]: LocationHistory[];
}

export interface DailyPassengerData {
  date: string;
  passengers: number;
}

@Injectable()
export class DashboardService {
  private googleMapsApiKey: string;

  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY not found in .env file');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.googleMapsApiKey = apiKey;
  }

  async getDashboardData() {
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        0,
        0,
        0,
      ),
    );
    const tomorrowUTC = new Date(todayUTC);
    tomorrowUTC.setUTCDate(todayUTC.getUTCDate() + 1);

    const todaysCheckIns = await this.prisma.locationHistory.findMany({
      where: { timestamp: { gte: todayUTC, lt: tomorrowUTC } },
      orderBy: { timestamp: 'asc' },
    });

    const checkInsByUser = todaysCheckIns.reduce<CheckInsByUserInput>(
      (acc, checkIn) => {
        if (!acc[checkIn.userId]) {
          acc[checkIn.userId] = [];
        }
        acc[checkIn.userId].push(checkIn);
        return acc;
      },
      {},
    );

    let checkInsToday = 0;
    let checkOutsToday = 0;

    for (const userId in checkInsByUser) {
      const userRecords = checkInsByUser[userId];
      userRecords.forEach((_, index) => {
        // O 1º, 3º, 5º registo, etc. (índices 0, 2, 4) são check-ins
        if (index % 2 === 0) {
          checkInsToday++;
        } else {
          // O 2º, 4º, 6º registo, etc. (índices 1, 3, 5) são check-outs
          checkOutsToday++;
        }
      });
    }

    // --- CÁLCULOS DE MÉTRICAS ---

    // 1. Passageiros a bordo
    const passengersOnBoard = Object.values(checkInsByUser).filter(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (checkIns) => checkIns.length % 2 !== 0,
    ).length;

    // 2. Distâncias para viagens concluídas
    const tripPromises: Promise<number>[] = [];
    for (const userId in checkInsByUser) {
      const userCheckIns = checkInsByUser[userId];
      for (let i = 0; i < Math.floor(userCheckIns.length / 2); i++) {
        const entry = userCheckIns[i * 2];
        const exit = userCheckIns[i * 2 + 1];
        tripPromises.push(
          this.getRouteDistance(
            { lat: entry.latitude, lng: entry.longitude },
            { lat: exit.latitude, lng: exit.longitude },
          ),
        );
      }
    }

    const completedTripDistances = await Promise.all(tripPromises);

    // 3. Quilometragem média
    const averageKilometers =
      completedTripDistances.length > 0
        ? completedTripDistances.reduce((a, b) => a + b, 0) /
          completedTripDistances.length
        : 0;

    // 4. Faixa de quilometragem
    const mileageRanges = {
      '0-5 km': 0,
      '5-10 km': 0,
      '10-15 km': 0,
      '15-20 km': 0,
      '20+ km': 0,
    };
    completedTripDistances.forEach((distance) => {
      if (distance <= 5) mileageRanges['0-5 km']++;
      else if (distance <= 10) mileageRanges['5-10 km']++;
      else if (distance <= 15) mileageRanges['10-15 km']++;
      else if (distance <= 20) mileageRanges['15-20 km']++;
      else mileageRanges['20+ km']++;
    });

    // 5. Quantidade de passageiros por dia
    const dailyPassengerCount: DailyPassengerData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const dailyTrips = await this.prisma.locationHistory.groupBy({
        by: ['userId'],
        where: { timestamp: { gte: date, lt: nextDate } },
        _count: { id: true },
      });

      const passengerCount = dailyTrips.filter(
        (group) => group._count.id >= 2,
      ).length;
      dailyPassengerCount.push({
        date: date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        }),
        passengers: passengerCount,
      });
    }

    return {
      checkInsToday,
      checkOutsToday,
      passengersOnBoard,
      averageKilometers: parseFloat(averageKilometers.toFixed(2)),
      mileageRanges,
      dailyPassengerCount,
    };
  }

  private async getRouteDistance(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<number> {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${this.googleMapsApiKey}`;

    try {
      const response = await firstValueFrom(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        this.httpService.get<GoogleDirectionsResponse>(url),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const route = response.data.routes?.[0];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const leg = route?.legs?.[0];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (leg?.distance?.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return leg.distance.value / 1000; // Converte para quilómetros
      }
      return 0;
    } catch (error) {
      console.error(
        'Google Maps API request failed:',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException(
        'Failed to calculate route distance.',
      );
    }
  }
}
