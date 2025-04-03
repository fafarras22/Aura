
import { SensorData, SensorStatus, ClimateReading, WaterReading } from './types';

export const getMockSensorData = (): SensorData[] => {
  return [
    {
      id: "sensor-1",
      name: "Temperature",
      value: 24.5,
      unit: "°C",
      status: "normal" as SensorStatus,
      category: "climate",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-2",
      name: "Humidity",
      value: 65,
      unit: "%",
      status: "normal" as SensorStatus,
      category: "climate",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-3",
      name: "CO2 Level",
      value: 420,
      unit: "ppm",
      status: "normal" as SensorStatus,
      category: "climate",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-4",
      name: "Light Intensity",
      value: 850,
      unit: "lux",
      status: "normal" as SensorStatus,
      category: "climate",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-5",
      name: "Water pH",
      value: 6.2,
      unit: "pH",
      status: "warning" as SensorStatus,
      category: "water",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-6",
      name: "Nutrient Level",
      value: 520,
      unit: "ppm",
      status: "normal" as SensorStatus,
      category: "water",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-7",
      name: "Water Temperature",
      value: 22.8,
      unit: "°C",
      status: "normal" as SensorStatus,
      category: "water",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-8",
      name: "Dissolved Oxygen",
      value: 6.5,
      unit: "mg/L",
      status: "error" as SensorStatus,
      category: "water",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-9",
      name: "Power Consumption",
      value: 2.4,
      unit: "kWh",
      status: "normal" as SensorStatus,
      category: "energy",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-10",
      name: "Solar Generation",
      value: 1.8,
      unit: "kWh",
      status: "normal" as SensorStatus,
      category: "energy",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-11",
      name: "Soil Moisture",
      value: 35,
      unit: "%",
      status: "warning" as SensorStatus,
      category: "environment",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "sensor-12",
      name: "Air Quality",
      value: 82,
      unit: "AQI",
      status: "normal" as SensorStatus,
      category: "environment",
      lastUpdated: new Date().toISOString()
    }
  ];
};
