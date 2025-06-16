import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '@/services/api';
import { useFocusEffect } from 'expo-router';

type KpiCardProps = { title: string; value: number | string; unit?: string };
const KpiCard: React.FC<KpiCardProps> = ({ title, value, unit }) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiTitle}>{title}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: scale(5) }}>
      <Text style={styles.kpiValue}>{value}</Text>
      {unit && <Text style={styles.kpiUnit}>{unit}</Text>}
    </View>
  </View>
);
type MileageRanges = { [range: string]: number };
type DailyPassengerCount = { date: string; passengers: number }[];
type DashboardData = {
  checkInsToday: number;
  checkOutsToday: number;
  mileageRanges: MileageRanges;
  dailyPassengerCount: DailyPassengerCount;
  passengersOnBoard: number;
  averageKilometers: number;
};

export default function DashboardScreen() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/dashboard');
          setDashboardData(response.data);
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
          setDashboardData(null); // Limpa os dados em caso de erro para mostrar a mensagem
        } finally {
          if (isLoading) {
            setIsLoading(false);
          }
        }
      };

      fetchData();
    }, [isLoading])
  );

  if (isLoading) {
    return <View style={[styles.container, styles.center]}><ActivityIndicator size="large" color="#fff" /></View>;
  }

  if (!dashboardData) {
    return <View style={[styles.container, styles.center]}><Text style={styles.header}>Não foi possível carregar os dados.</Text></View>;
  }

  const chartConfig = {
    backgroundColor: '#1f1f1f',
    backgroundGradientFrom: '#1f1f1f',
    backgroundGradientTo: '#1f1f1f',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
        fontSize: RFValue(9),
    },
    barPercentage: 0.5,
  };
  
  const mileageRangeData = {
    labels: Object.keys(dashboardData.mileageRanges).map(label => label.replace(' km', '')),
    datasets: [{ data: Object.values(dashboardData.mileageRanges) }]
  };
  const dailyPassengerData = {
    labels: dashboardData.dailyPassengerCount.map(d => d.date),
    datasets: [{ data: dashboardData.dailyPassengerCount.map(d => d.passengers) }]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Dashboard do Dia</Text>
        
        <View style={styles.kpiContainer}>
          <KpiCard title="Passageiros a Bordo" value={dashboardData.passengersOnBoard} />
          <KpiCard title="Distância Média" value={dashboardData.averageKilometers} unit="km" />
        </View>

        {}
        <View style={styles.kpiContainer}>
          <KpiCard title="Check-ins Hoje" value={dashboardData.checkInsToday} />
          <KpiCard title="Check-outs Hoje" value={dashboardData.checkOutsToday} />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Faixa de Quilometragem (Hoje)</Text>
          <BarChart
            data={mileageRangeData}
            width={Dimensions.get('window').width - scale(40)}
            height={240}
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
            style={styles.chartStyle} 
            yAxisLabel=""
            yAxisSuffix=""
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Passageiros por Dia (Últimos 7 dias)</Text>
           <BarChart
            data={dailyPassengerData}
            width={Dimensions.get('window').width - scale(40)}
            height={240}
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
            style={styles.chartStyle} 
            yAxisLabel=""
            yAxisSuffix=""
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { padding: scale(20) },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: verticalScale(20),
  },
  kpiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
    gap: scale(15),
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: scale(15),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiTitle: {
    fontSize: RFValue(13),
    color: '#aaa',
    marginBottom: verticalScale(8),
  },
  kpiValue: {
    fontSize: RFValue(26),
    color: '#fff',
    fontWeight: '600',
  },
  kpiUnit: {
    fontSize: RFValue(14),
    color: '#fff',
    fontWeight: '500',
    paddingBottom: verticalScale(2),
  },
  chartContainer: {
    marginBottom: verticalScale(20),
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(5),
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: RFValue(16),
    color: '#fff',
    fontWeight: '600',
    marginBottom: verticalScale(15),
  },
  chartStyle: {
    borderRadius: 16,
  },
});
