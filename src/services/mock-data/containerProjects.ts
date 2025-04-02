
import { ContainerProject } from '@/components/containers/ContainerCard';

export interface ProjectStats {
  salesData: {
    monthly: number;
    total: number;
    growth: number;
  };
  sensors: {
    temperature: number;
    humidity: number;
    waterLevel: number;
    ph: number;
  };
  climateInfo: {
    optimalTemperature: string;
    lightHours: number;
    waterConsumption: string;
  };
  stakingInfo: {
    totalStaked: number;
    apy: number;
    holders: number;
    harvestTime: string;
  };
}

export function getMockContainerProjects(): (ContainerProject & { details?: ProjectStats })[] {
  return [
    {
      id: "container1",
      name: "Lettuce Farm Jakarta",
      imageUrl: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png",
      description: "High-yield lettuce farming container with AI-powered climate control and IoT monitoring.",
      totalTokens: 10000,
      filledTokens: 6540,
      apy: 15.5,
      runtimeDays: 365,
      status: "live",
      details: {
        salesData: {
          monthly: 24500000,
          total: 124700000,
          growth: 12.4
        },
        sensors: {
          temperature: 23.5,
          humidity: 68,
          waterLevel: 85,
          ph: 6.3
        },
        climateInfo: {
          optimalTemperature: "22-24°C",
          lightHours: 14,
          waterConsumption: "8.5L per day"
        },
        stakingInfo: {
          totalStaked: 6540,
          apy: 15.5,
          holders: 42,
          harvestTime: "Every 30 days"
        }
      }
    },
    {
      id: "container2",
      name: "Tomato Hub Bandung",
      imageUrl: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png",
      description: "Specialized container for growing premium tomato varieties with precision nutrient delivery.",
      totalTokens: 8000,
      filledTokens: 7200,
      apy: 18.2,
      runtimeDays: 300,
      status: "live",
      details: {
        salesData: {
          monthly: 28700000,
          total: 143500000,
          growth: 15.2
        },
        sensors: {
          temperature: 25.2,
          humidity: 72,
          waterLevel: 90,
          ph: 6.0
        },
        climateInfo: {
          optimalTemperature: "24-26°C",
          lightHours: 16,
          waterConsumption: "10.2L per day"
        },
        stakingInfo: {
          totalStaked: 7200,
          apy: 18.2,
          holders: 38,
          harvestTime: "Every 25 days"
        }
      }
    },
    {
      id: "container3",
      name: "Herb Garden Bali",
      imageUrl: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
      description: "Artisanal herb container supplying fresh culinary herbs to Bali's premium resorts and restaurants.",
      totalTokens: 5000,
      filledTokens: 2750,
      apy: 16.8,
      runtimeDays: 365,
      status: "live",
      details: {
        salesData: {
          monthly: 19800000,
          total: 89600000,
          growth: 9.7
        },
        sensors: {
          temperature: 24.8,
          humidity: 65,
          waterLevel: 78,
          ph: 6.5
        },
        climateInfo: {
          optimalTemperature: "23-25°C",
          lightHours: 12,
          waterConsumption: "7.2L per day"
        },
        stakingInfo: {
          totalStaked: 2750,
          apy: 16.8,
          holders: 23,
          harvestTime: "Every 15 days"
        }
      }
    },
    {
      id: "container4",
      name: "Strawberry Vertical Farm",
      imageUrl: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png",
      description: "Innovative vertical farming system growing premium strawberries year-round with minimal water usage.",
      totalTokens: 12000,
      filledTokens: 3500,
      apy: 19.5,
      runtimeDays: 730,
      status: "upcoming",
      details: {
        salesData: {
          monthly: 0,
          total: 0,
          growth: 0
        },
        sensors: {
          temperature: 22.0,
          humidity: 70,
          waterLevel: 95,
          ph: 5.8
        },
        climateInfo: {
          optimalTemperature: "20-23°C",
          lightHours: 10,
          waterConsumption: "5.5L per day"
        },
        stakingInfo: {
          totalStaked: 3500,
          apy: 19.5,
          holders: 15,
          harvestTime: "Every 45 days"
        }
      }
    },
    {
      id: "container5",
      name: "Microgreens Specialist",
      imageUrl: "/lovable-uploads/b795ce5f-6c21-4dec-8060-90844a893974.png",
      description: "Specialized container producing high-margin microgreens for Jakarta's fine dining establishments.",
      totalTokens: 6000,
      filledTokens: 4500,
      apy: 20.2,
      runtimeDays: 365,
      status: "ico",
      details: {
        salesData: {
          monthly: 0,
          total: 0,
          growth: 0
        },
        sensors: {
          temperature: 21.5,
          humidity: 75,
          waterLevel: 88,
          ph: 6.2
        },
        climateInfo: {
          optimalTemperature: "20-22°C",
          lightHours: 18,
          waterConsumption: "4.8L per day"
        },
        stakingInfo: {
          totalStaked: 4500,
          apy: 20.2,
          holders: 28,
          harvestTime: "Every 10 days"
        }
      }
    },
    {
      id: "container6",
      name: "Kale & Spinach Farm",
      imageUrl: "/lovable-uploads/c5b2d24e-f106-4e89-af2d-efaced4463bb.png",
      description: "Leafy greens farm optimized for maximum nutrition and yield with smart monitoring technology.",
      totalTokens: 15000,
      filledTokens: 15000,
      apy: 17.8,
      runtimeDays: 365,
      status: "completed",
      details: {
        salesData: {
          monthly: 32100000,
          total: 385200000,
          growth: 8.5
        },
        sensors: {
          temperature: 22.8,
          humidity: 69,
          waterLevel: 92,
          ph: 6.1
        },
        climateInfo: {
          optimalTemperature: "21-24°C",
          lightHours: 14,
          waterConsumption: "9.2L per day"
        },
        stakingInfo: {
          totalStaked: 15000,
          apy: 17.8,
          holders: 64,
          harvestTime: "Every 30 days"
        }
      }
    },
    {
      id: "container7",
      name: "Pepper Innovation Hub",
      imageUrl: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png",
      description: "Specialized in growing rare pepper varieties with controlled conditions for maximum flavor development.",
      totalTokens: 9000,
      filledTokens: 4200,
      apy: 16.4,
      runtimeDays: 365,
      status: "live",
      details: {
        salesData: {
          monthly: 18500000,
          total: 92500000,
          growth: 11.3
        },
        sensors: {
          temperature: 26.2,
          humidity: 67,
          waterLevel: 83,
          ph: 5.9
        },
        climateInfo: {
          optimalTemperature: "25-28°C",
          lightHours: 16,
          waterConsumption: "8.8L per day"
        },
        stakingInfo: {
          totalStaked: 4200,
          apy: 16.4,
          holders: 31,
          harvestTime: "Every 40 days"
        }
      }
    },
    {
      id: "container8",
      name: "Cucumber Vertical System",
      imageUrl: "/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png",
      description: "Advanced hydroponic system for growing premium cucumbers with 90% less water than traditional farming.",
      totalTokens: 7500,
      filledTokens: 3800,
      apy: 15.9,
      runtimeDays: 365,
      status: "upcoming",
      details: {
        salesData: {
          monthly: 0,
          total: 0,
          growth: 0
        },
        sensors: {
          temperature: 24.5,
          humidity: 71,
          waterLevel: 87,
          ph: 6.2
        },
        climateInfo: {
          optimalTemperature: "23-26°C",
          lightHours: 14,
          waterConsumption: "7.5L per day"
        },
        stakingInfo: {
          totalStaked: 3800,
          apy: 15.9,
          holders: 27,
          harvestTime: "Every 20 days"
        }
      }
    },
    {
      id: "container9",
      name: "Premium Salad Mix",
      imageUrl: "/lovable-uploads/1fe7dc27-86fd-4951-be87-72e09e824c9b.png",
      description: "Diverse salad greens grown in carefully controlled environments for consistent quality and flavor profiles.",
      totalTokens: 11000,
      filledTokens: 8700,
      apy: 17.2,
      runtimeDays: 365,
      status: "live",
      details: {
        salesData: {
          monthly: 25900000,
          total: 129500000,
          growth: 13.8
        },
        sensors: {
          temperature: 23.2,
          humidity: 73,
          waterLevel: 90,
          ph: 6.3
        },
        climateInfo: {
          optimalTemperature: "22-24°C",
          lightHours: 12,
          waterConsumption: "8.2L per day"
        },
        stakingInfo: {
          totalStaked: 8700,
          apy: 17.2,
          holders: 48,
          harvestTime: "Every 25 days"
        }
      }
    },
    {
      id: "container10",
      name: "Berry Experimental Farm",
      imageUrl: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png",
      description: "Research-focused container farm developing new methods for growing berries in tropical climates.",
      totalTokens: 20000,
      filledTokens: 5400,
      apy: 21.5,
      runtimeDays: 730,
      status: "ico",
      details: {
        salesData: {
          monthly: 0,
          total: 0,
          growth: 0
        },
        sensors: {
          temperature: 21.0,
          humidity: 78,
          waterLevel: 92,
          ph: 5.7
        },
        climateInfo: {
          optimalTemperature: "19-22°C",
          lightHours: 10,
          waterConsumption: "6.5L per day"
        },
        stakingInfo: {
          totalStaked: 5400,
          apy: 21.5,
          holders: 22,
          harvestTime: "Every 60 days"
        }
      }
    }
  ];
}
