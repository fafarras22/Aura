import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Activity, AlertTriangle, ThermometerSun, Droplets, MapPin, Sprout, Timer, CircleAlert, ChevronRight, BoxIcon, ShieldAlert, Leaf } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";

// Mock project data
const mockProjectData = {
  id: "project-1",
  name: "Jakarta Vertical Farm Alpha",
  type: "Hydroponic Container",
  cropType: "Mixed Greens",
  status: "active",
  location: {
    name: "Jakarta Vertical Farm Hub",
    coordinates: [-6.2088, 106.8456],
    status: "active",
    address: "Jl. Sudirman 123, Jakarta Pusat"
  },
  startDate: "2023-09-15",
  harvestCycle: 28,
  nextHarvest: "2023-04-18",
  climate: {
    temperature: 24.5,
    humidity: 68,
    co2: 420,
    luminosity: 12000,
    status: "normal"
  },
  water: {
    ph: 6.2,
    tds: 840,
    temperature: 22.8,
    level: 85,
    flow: 2.4,
    status: "normal"
  },
  yields: {
    current: 32.4,
    target: 35.0,
    previousHarvest: 31.8,
    unit: "kg",
    history: [
      { date: "2023-10-12", amount: 30.5 },
      { date: "2023-11-09", amount: 31.8 },
      { date: "2023-12-07", amount: 29.7 },
      { date: "2024-01-04", amount: 32.2 },
      { date: "2024-02-01", amount: 31.9 },
      { date: "2024-03-01", amount: 32.4 }
    ]
  },
  alerts: [
    { id: "a1", type: "warning", message: "Water TDS slightly elevated", timestamp: "2023-04-02T08:30:00" },
    { id: "a2", type: "info", message: "Scheduled maintenance tomorrow", timestamp: "2023-04-02T14:20:00" }
  ],
  sensors: [
    { id: "s1", name: "Air Temperature", value: 24.5, unit: "°C", status: "normal" },
    { id: "s2", name: "Humidity", value: 68, unit: "%", status: "normal" },
    { id: "s3", name: "Water pH", value: 6.2, unit: "", status: "normal" },
    { id: "s4", name: "Water TDS", value: 840, unit: "ppm", status: "warning" },
    { id: "s5", name: "CO2", value: 420, unit: "ppm", status: "normal" },
    { id: "s6", name: "Light Intensity", value: 12000, unit: "lux", status: "normal" },
    { id: "s7", name: "Water Temp", value: 22.8, unit: "°C", status: "normal" },
    { id: "s8", name: "Water Level", value: 85, unit: "%", status: "normal" }
  ]
};

const ProjectDashboard = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<any>(null);
  
  // Content translations with unique property names
  const content = {
    en: {
      loading: "Loading project data...",
      backToProjects: "Back to Projects",
      overview: "Overview",
      climate: "Climate",
      water: "Water",
      sensors: "Sensors",
      yields: "Yields",
      analytics: "Analytics",
      settings: "Settings",
      status: "Status",
      systemStatus: "System Status",
      temperature: "Temperature",
      humidity: "Humidity",
      co2: "CO2 Level",
      light: "Light",
      ph: "pH Level",
      tds: "TDS",
      waterTemp: "Water Temperature",
      flow: "Flow Rate",
      waterLevel: "Water Level",
      alerts: "Alerts",
      noAlerts: "No alerts at this time",
      harvestCycle: "Harvest Cycle",
      nextHarvest: "Next Harvest",
      days: "days",
      viewAllAlerts: "View All Alerts",
      currentYield: "Current Yield",
      yieldTarget: "Yield Target",
      yieldHistory: "Yield History",
      sensorReadings: "Sensor Readings",
      location: "Location",
      projectInfo: "Project Information",
      normal: "Normal",
      warning: "Warning",
      error: "Error",
      viewAll: "View All",
      // Ensure no duplicates by adding these here
      active: "Active",
      maintenance: "Maintenance", 
      offline: "Offline"
    },
    id: {
      loading: "Memuat data proyek...",
      backToProjects: "Kembali ke Proyek",
      overview: "Ikhtisar",
      climate: "Iklim",
      water: "Air",
      sensors: "Sensor",
      yields: "Hasil Panen",
      analytics: "Analitik",
      settings: "Pengaturan",
      status: "Status",
      systemStatus: "Status Sistem",
      temperature: "Suhu",
      humidity: "Kelembaban",
      co2: "Tingkat CO2",
      light: "Cahaya",
      ph: "Tingkat pH",
      tds: "TDS",
      waterTemp: "Suhu Air",
      flow: "Laju Aliran",
      waterLevel: "Tingkat Air",
      alerts: "Peringatan",
      noAlerts: "Tidak ada peringatan saat ini",
      harvestCycle: "Siklus Panen",
      nextHarvest: "Panen Berikutnya",
      days: "hari",
      viewAllAlerts: "Lihat Semua Peringatan",
      currentYield: "Hasil Saat Ini",
      yieldTarget: "Target Hasil",
      yieldHistory: "Riwayat Hasil",
      sensorReadings: "Pembacaan Sensor",
      location: "Lokasi",
      projectInfo: "Informasi Proyek",
      normal: "Normal",
      warning: "Peringatan",
      error: "Kesalahan",
      viewAll: "Lihat Semua",
      // Ensure no duplicates by adding these here
      active: "Aktif",
      maintenance: "Pemeliharaan",
      offline: "Offline"
    },
    ko: {
      loading: "프로젝트 데이터 로딩 중...",
      backToProjects: "프로젝트로 돌아가기",
      overview: "개요",
      climate: "기후",
      water: "물",
      sensors: "센서",
      yields: "수확량",
      analytics: "분석",
      settings: "설정",
      status: "상태",
      systemStatus: "시스템 상태",
      temperature: "온도",
      humidity: "습도",
      co2: "CO2 수준",
      light: "빛",
      ph: "pH 수준",
      tds: "TDS",
      waterTemp: "수온",
      flow: "유속",
      waterLevel: "수위",
      alerts: "경고",
      noAlerts: "현재 경고 없음",
      harvestCycle: "수확 주기",
      nextHarvest: "다음 수확",
      days: "일",
      viewAllAlerts: "모든 경고 보기",
      currentYield: "현재 수확량",
      yieldTarget: "수확량 목표",
      yieldHistory: "수확량 기록",
      sensorReadings: "센서 판독값",
      location: "위치",
      projectInfo: "프로젝트 정보",
      normal: "정상",
      warning: "경고",
      error: "오류",
      viewAll: "모두 보기",
      // Ensure no duplicates by adding these here
      active: "활성",
      maintenance: "유지보수",
      offline: "오프라인"
    }
  };
  
  // Fetch project data
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    // In a real app, you would fetch from an API with the projectId
    setTimeout(() => {
      setProjectData(mockProjectData);
      setLoading(false);
    }, 1000);
  }, [projectId]);

  // Mock temperature data for chart
  const tempData = [
    { time: '00:00', temperature: 23.8 },
    { time: '04:00', temperature: 23.2 },
    { time: '08:00', temperature: 24.1 },
    { time: '12:00', temperature: 25.3 },
    { time: '16:00', temperature: 24.7 },
    { time: '20:00', temperature: 24.3 },
    { time: 'Now', temperature: 24.5 }
  ];
  
  // Mock humidity data for chart
  const humidityData = [
    { time: '00:00', humidity: 65 },
    { time: '04:00', humidity: 67 },
    { time: '08:00', humidity: 68 },
    { time: '12:00', humidity: 70 },
    { time: '16:00', humidity: 69 },
    { time: '20:00', humidity: 67 },
    { time: 'Now', humidity: 68 }
  ];
  
  // Mock water data for chart
  const waterData = [
    { time: '00:00', pH: 6.0, tds: 820 },
    { time: '04:00', pH: 6.1, tds: 830 },
    { time: '08:00', pH: 6.3, tds: 835 },
    { time: '12:00', pH: 6.2, tds: 845 },
    { time: '16:00', pH: 6.2, tds: 840 },
    { time: '20:00', pH: 6.1, tds: 835 },
    { time: 'Now', pH: 6.2, tds: 840 }
  ];
  
  // Get yield data for chart
  const yieldData = projectData?.yields?.history || [];

  if (loading) {
    return (
      <>
        <AppHeader 
          setShowWalletModal={setIsWalletModalOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="container mx-auto p-6 mt-16 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p>{content[language].loading}</p>
          </div>
        </div>
        <Footer language={language} />
      </>
    );
  }
  
  if (!projectData) {
    return (
      <>
        <AppHeader 
          setShowWalletModal={setIsWalletModalOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="container mx-auto p-6 mt-16">
          <div className="text-center py-12">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Project Not Found</AlertTitle>
              <AlertDescription>
                The project you are looking for does not exist or has been removed.
              </AlertDescription>
            </Alert>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {content[language].backToProjects}
            </Button>
          </div>
        </div>
        <Footer language={language} />
      </>
    );
  }

  return (
    <>
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="container mx-auto p-6 mt-16">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {content[language].backToProjects}
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{projectData.name}</h1>
              <p className="text-muted-foreground">{projectData.type} - {projectData.cropType}</p>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="default" className="capitalize">
                {projectData.status}
              </Badge>
              <Button variant="outline" size="sm">
                <Activity className="mr-2 h-4 w-4" />
                {content[language].overview}
              </Button>
              <Button variant="default" size="sm">
                <Sprout className="mr-2 h-4 w-4" />
                {content[language].yields}
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 w-full">
            <TabsTrigger value="overview">
              <BoxIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].overview}</span>
            </TabsTrigger>
            <TabsTrigger value="climate">
              <ThermometerSun className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].climate}</span>
            </TabsTrigger>
            <TabsTrigger value="water">
              <Droplets className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].water}</span>
            </TabsTrigger>
            <TabsTrigger value="sensors">
              <Activity className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].sensors}</span>
            </TabsTrigger>
            <TabsTrigger value="yields">
              <Leaf className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].yields}</span>
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].location}</span>
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <ShieldAlert className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{content[language].alerts}</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Status Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{content[language].projectInfo}</CardTitle>
                  <CardDescription>{projectData.type} - {projectData.status}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col border p-4 rounded-lg">
                      <span className="text-sm text-muted-foreground">{content[language].harvestCycle}</span>
                      <div className="flex items-center mt-1">
                        <Timer className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-2xl font-bold">{projectData.harvestCycle}</span>
                        <span className="ml-1 text-sm text-muted-foreground">{content[language].days}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col border p-4 rounded-lg">
                      <span className="text-sm text-muted-foreground">{content[language].nextHarvest}</span>
                      <div className="flex items-center mt-1">
                        <Sprout className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-lg font-medium">{projectData.nextHarvest}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col border p-4 rounded-lg">
                      <span className="text-sm text-muted-foreground">{content[language].currentYield}</span>
                      <div className="flex items-center mt-1">
                        <Leaf className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-2xl font-bold">{projectData.yields.current}</span>
                        <span className="ml-1 text-sm text-muted-foreground">{projectData.yields.unit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{content[language].yieldTarget}</span>
                      <span>{projectData.yields.current}/{projectData.yields.target} {projectData.yields.unit}</span>
                    </div>
                    <Progress value={(projectData.yields.current / projectData.yields.target) * 100} className="h-2" />
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-3">{content[language].yieldHistory}</h4>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={yieldData}
                          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="amount" name="Yield (kg)" fill="#4ade80" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Alerts Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                    {content[language].alerts}
                  </CardTitle>
                  <CardDescription>{projectData.alerts.length} alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  {projectData.alerts.length > 0 ? (
                    <div className="space-y-3">
                      {projectData.alerts.map((alert: any) => (
                        <Alert key={alert.id} variant={alert.type === 'error' ? "destructive" : (alert.type === 'warning' ? "default" : "default")}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>{alert.type}</AlertTitle>
                          <AlertDescription className="flex justify-between">
                            <span>{alert.message}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </AlertDescription>
                        </Alert>
                      ))}
                      <Button variant="outline" className="w-full mt-2">
                        {content[language].viewAllAlerts}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CircleAlert className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p>{content[language].noAlerts}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Quick Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:col-span-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <ThermometerSun className="h-6 w-6 text-orange-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">{content[language].temperature}</p>
                          <p className="text-2xl font-bold">{projectData.climate.temperature}°C</p>
                        </div>
                      </div>
                      <Badge variant={projectData.climate.status === 'normal' ? 'outline' : 'secondary'}>
                        {content[language][projectData.climate.status]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Droplets className="h-6 w-6 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">{content[language].ph}</p>
                          <p className="text-2xl font-bold">{projectData.water.ph}</p>
                        </div>
                      </div>
                      <Badge variant={projectData.water.status === 'normal' ? 'outline' : 'secondary'}>
                        {content[language][projectData.water.status]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MapPin className="h-6 w-6 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">{content[language].location}</p>
                          <p className="text-lg font-medium truncate max-w-[180px]">{projectData.location.name}</p>
                        </div>
                      </div>
                      <Badge variant={projectData.location.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                        {content[language][projectData.location.status]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Climate Tab */}
          <TabsContent value="climate">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{content[language].climate}</CardTitle>
                      <CardDescription>
                        {content[language].systemStatus}: 
                        <Badge variant={projectData.climate.status === 'normal' ? 'outline' : 'secondary'} className="ml-2">
                          {content[language][projectData.climate.status]}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={tempData}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#ed8936" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={humidityData}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#4299e1" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].sensorReadings}</CardTitle>
                  <CardDescription>Climate control readings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].temperature}</p>
                        <p className="text-xl font-bold">{projectData.climate.temperature}°C</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].humidity}</p>
                        <p className="text-xl font-bold">{projectData.climate.humidity}%</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].co2}</p>
                        <p className="text-xl font-bold">{projectData.climate.co2} ppm</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].light}</p>
                        <p className="text-xl font-bold">{projectData.climate.luminosity} lux</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Water Tab */}
          <TabsContent value="water">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{content[language].water}</CardTitle>
                      <CardDescription>
                        {content[language].systemStatus}:
                        <Badge variant={projectData.water.status === 'normal' ? 'outline' : 'secondary'} className="ml-2">
                          {content[language][projectData.water.status]}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={waterData}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" domain={[750, 900]} />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="pH" name="pH Level" stroke="#4299e1" />
                        <Line yAxisId="right" type="monotone" dataKey="tds" name="TDS (ppm)" stroke="#ed8936" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{content[language].waterLevel}</p>
                          <div className="relative pt-1">
                            <p className="text-xl font-bold">{projectData.water.level}%</p>
                            <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                              <div 
                                className="bg-blue-500 rounded"
                                style={{ width: `${projectData.water.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{content[language].flow}</p>
                          <p className="text-xl font-bold">{projectData.water.flow} L/min</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].sensorReadings}</CardTitle>
                  <CardDescription>Water system readings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].ph}</p>
                        <p className="text-xl font-bold">{projectData.water.ph}</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].tds}</p>
                        <p className="text-xl font-bold">{projectData.water.tds} ppm</p>
                      </div>
                      <Badge variant="secondary">{content[language].warning}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].waterTemp}</p>
                        <p className="text-xl font-bold">{projectData.water.temperature}°C</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{content[language].waterLevel}</p>
                        <p className="text-xl font-bold">{projectData.water.level}%</p>
                      </div>
                      <Badge variant="outline">{content[language].normal}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Other TabsContent sections for sensors, yields, location, alerts */}
          {/* These tabs would be implemented similarly to the ones above */}
          <TabsContent value="sensors">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].sensors}</CardTitle>
                <CardDescription>All sensor readings from this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {projectData.sensors.map((sensor: any) => (
                    <Card key={sensor.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{sensor.name}</p>
                          <Badge 
                            variant={
                              sensor.status === 'normal' ? 'outline' : 
                              sensor.status === 'warning' ? 'secondary' : 'destructive'
                            }
                          >
                            {content[language][sensor.status]}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold">{sensor.value}{sensor.unit}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yields">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].yields}</CardTitle>
                <CardDescription>Harvest data and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{content[language].currentYield}</p>
                      <p className="text-2xl font-bold">{projectData.yields.current} {projectData.yields.unit}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {projectData.yields.current > projectData.yields.previousHarvest ? 
                          `+${((projectData.yields.current - projectData.yields.previousHarvest) / projectData.yields.previousHarvest * 100).toFixed(1)}% from previous` : 
                          `${((projectData.yields.current - projectData.yields.previousHarvest) / projectData.yields.previousHarvest * 100).toFixed(1)}% from previous`}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{content[language].yieldTarget}</p>
                      <p className="text-2xl font-bold">{projectData.yields.target} {projectData.yields.unit}</p>
                      <Progress value={(projectData.yields.current / projectData.yields.target) * 100} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{content[language].nextHarvest}</p>
                      <p className="text-lg font-bold">{projectData.nextHarvest}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        In {Math.floor((new Date(projectData.nextHarvest).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={yieldData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="amount" name="Yield (kg)" stroke="#4ade80" fill="#4ade80" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{projectData.location.name}</CardTitle>
                    <CardDescription>{projectData.location.address}</CardDescription>
                  </div>
                  <Badge variant={projectData.location.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {projectData.location.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 h-96 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium">Map View</p>
                    <p className="text-sm text-muted-foreground">Geographic location: {projectData.location.coordinates[0]}, {projectData.location.coordinates[1]}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Regional Climate</p>
                      <p className="font-medium">Tropical</p>
                      <p className="text-xs text-muted-foreground mt-1">Avg. Temp: 28°C</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Local Infrastructure</p>
                      <p className="font-medium">Urban</p>
                      <p className="text-xs text-muted-foreground mt-1">Good access to markets</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Transport Routes</p>
                      <p className="font-medium">3 Major Routes</p>
                      <p className="text-xs text-muted-foreground mt-1">30 min to central market</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].alerts}</CardTitle>
                <CardDescription>System alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                {projectData.alerts.length > 0 ? (
                  <div className="space-y-3">
                    {projectData.alerts.map((alert: any) => (
                      <Alert key={alert.id} variant={alert.type === 'error' ? "destructive" : "default"}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>{alert.type}</AlertTitle>
                        <AlertDescription>
                          {alert.message}
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CircleAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">{content[language].noAlerts}</p>
                    <p className="text-sm text-muted-foreground">All systems operating normally</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer language={language} />
    </>
  );
};

export default ProjectDashboard;
