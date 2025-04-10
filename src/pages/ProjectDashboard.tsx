
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { WaterMonitoringCard } from "@/components/dashboard/WaterMonitoringCard";
import { ClimateMonitoringCard } from "@/components/dashboard/ClimateMonitoringCard";
import { 
  AlertTriangle, 
  Thermometer, 
  Droplet, 
  Wind, 
  Activity, 
  Calendar, 
  InfoIcon,
  ChevronDown,
  MapPin,
  Leaf,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { useProjectDashboard } from "@/hooks/useProjectDashboard";
import { format } from "date-fns";
import { SEOMetadata } from "@/components/shared/SEOMetadata";

const ProjectDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { projectData, allProjects, loading, error } = useProjectDashboard(id);
  const [activeTab, setActiveTab] = useState("overview");
  
  const content = {
    en: {
      loading: "Loading project data...",
      error: "Error loading project data",
      tryAgain: "Try Again",
      overview: "Overview",
      climate: "Climate",
      water: "Water",
      sensors: "Sensors",
      location: "Location",
      projectDashboard: "Project Dashboard",
      lastHarvest: "Last Harvest",
      nextHarvest: "Next Harvest",
      cropType: "Crop Type",
      alerts: "Alerts",
      noAlerts: "No alerts at this time",
      backToProjects: "Back to Projects",
      switchProject: "Switch Project",
      environmentalData: "Environmental Data",
      systemStatus: "System Status",
      normal: "Normal",
      warning: "Warning",
      error: "Error",
      viewAll: "View All"
    },
    id: {
      loading: "Memuat data proyek...",
      error: "Kesalahan memuat data proyek",
      tryAgain: "Coba Lagi",
      overview: "Ikhtisar",
      climate: "Iklim",
      water: "Air",
      sensors: "Sensor",
      location: "Lokasi",
      projectDashboard: "Dasbor Proyek",
      lastHarvest: "Panen Terakhir",
      nextHarvest: "Panen Berikutnya",
      cropType: "Jenis Tanaman",
      alerts: "Peringatan",
      noAlerts: "Tidak ada peringatan saat ini",
      backToProjects: "Kembali ke Proyek",
      switchProject: "Ganti Proyek",
      environmentalData: "Data Lingkungan",
      systemStatus: "Status Sistem",
      normal: "Normal",
      warning: "Peringatan",
      error: "Kesalahan",
      viewAll: "Lihat Semua"
    },
    ko: {
      loading: "프로젝트 데이터 로딩 중...",
      error: "프로젝트 데이터 로드 오류",
      tryAgain: "다시 시도",
      overview: "개요",
      climate: "기후",
      water: "물",
      sensors: "센서",
      location: "위치",
      projectDashboard: "프로젝트 대시보드",
      lastHarvest: "마지막 수확",
      nextHarvest: "다음 수확",
      cropType: "작물 유형",
      alerts: "경고",
      noAlerts: "현재 경고 없음",
      backToProjects: "프로젝트로 돌아가기",
      switchProject: "프로젝트 전환",
      environmentalData: "환경 데이터",
      systemStatus: "시스템 상태",
      normal: "정상",
      warning: "경고",
      error: "오류",
      viewAll: "모두 보기"
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  const getStatusColor = (status: 'normal' | 'warning' | 'error' | 'active' | 'maintenance' | 'offline') => {
    switch (status) {
      case 'normal':
      case 'active':
        return 'bg-green-500';
      case 'warning':
      case 'maintenance':
        return 'bg-yellow-500';
      case 'error':
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const switchProject = (newProjectId: string) => {
    navigate(`/project/${newProjectId}/dashboard`);
  };
  
  // Format water data for WaterMonitoringCard
  const formatWaterData = (projectData: any) => {
    if (!projectData || !projectData.water) return null;
    
    return {
      ph: projectData.water.ph,
      ec: projectData.water.ec,
      tds: projectData.water.tds,
      do: projectData.water.do,
      temperature: projectData.water.temperature,
      level: projectData.water.level,
      flowRate: projectData.water.flowRate,
      lastUpdated: projectData.water.lastUpdated,
      status: projectData.water.status,
      history: Array(5).fill(null).map((_, i) => {
        const time = new Date();
        time.setHours(time.getHours() - i * 2);
        
        return {
          time: format(time, 'HH:mm'),
          ph: projectData.water.ph + (Math.random() * 0.2 - 0.1),
          ec: projectData.water.ec + (Math.random() * 0.2 - 0.1),
          tds: projectData.water.tds + (Math.random() * 20 - 10),
          do: projectData.water.do + (Math.random() * 0.2 - 0.1),
          level: projectData.water.level + (Math.random() * 5 - 2.5),
          temperature: projectData.water.temperature + (Math.random() * 0.5 - 0.25)
        };
      }).reverse()
    };
  };
  
  // Format climate data for ClimateMonitoringCard
  const formatClimateData = (projectData: any) => {
    if (!projectData || !projectData.climate) return null;
    
    return {
      temperature: projectData.climate.temperature,
      humidity: projectData.climate.humidity,
      co2Level: projectData.climate.co2Level,
      light: projectData.climate.light,
      airflow: projectData.climate.airflow,
      lastUpdated: projectData.climate.lastUpdated,
      status: projectData.climate.status,
      history: Array(5).fill(null).map((_, i) => {
        const time = new Date();
        time.setHours(time.getHours() - i * 2);
        
        return {
          time: format(time, 'HH:mm'),
          temperature: projectData.climate.temperature + (Math.random() * 1 - 0.5),
          humidity: projectData.climate.humidity + (Math.random() * 3 - 1.5),
          co2Level: projectData.climate.co2Level + (Math.random() * 10 - 5),
          light: projectData.climate.light + (Math.random() * 1000 - 500),
          airflow: projectData.climate.airflow + (Math.random() * 0.2 - 0.1)
        };
      }).reverse()
    };
  };
  
  if (loading) {
    return (
      <>
        <AppHeader 
          setShowWalletModal={setShowWalletModal}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="container mx-auto p-6 pt-20">
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="h-8 w-40" />
          </div>
          <Skeleton className="h-10 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </>
    );
  }
  
  if (error || !projectData) {
    return (
      <>
        <AppHeader 
          setShowWalletModal={setShowWalletModal}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="container mx-auto p-6 pt-20">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{content[language].error}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/projects')}>{content[language].backToProjects}</Button>
        </div>
      </>
    );
  }
  
  return (
    <>
      <SEOMetadata
        title={`${projectData.name} Dashboard | AKAR Farm`}
        description={`Monitor and manage your ${projectData.cropType} container farm project. View real-time sensor data, climate conditions, and upcoming harvest information.`}
        keywords={`container farming, project dashboard, ${projectData.cropType}, agricultural monitoring, smart farming, IoT agriculture, AKAR Farm`}
        canonicalUrl={`https://akarfarm.com/project/${projectData.id}/dashboard`}
      />
      
      <AppHeader 
        setShowWalletModal={setShowWalletModal}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="container mx-auto p-6 pt-20">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2"
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{content[language].backToProjects}</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center">
                {projectData.name}
                <div className={`w-2 h-2 rounded-full ml-2 ${getStatusColor(projectData.location.status)}`}></div>
              </h1>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {projectData.location.name} | 
                <Leaf className="h-3 w-3 mx-1" /> {projectData.cropType}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {content[language].switchProject} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allProjects.map(project => (
                  <DropdownMenuItem 
                    key={project.id} 
                    onClick={() => switchProject(project.id)}
                    className={project.id === projectData.id ? "bg-accent" : ""}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(project.location.status)}`}></div>
                      <span>{project.name}</span>
                      {project.id === projectData.id && <ChevronRight className="ml-2 h-4 w-4" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Project Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">{content[language].overview}</TabsTrigger>
            <TabsTrigger value="climate">{content[language].climate}</TabsTrigger>
            <TabsTrigger value="water">{content[language].water}</TabsTrigger>
            <TabsTrigger value="sensors">{content[language].sensors}</TabsTrigger>
            <TabsTrigger value="location">{content[language].location}</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{content[language].lastHarvest}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    {formatDate(projectData.lastHarvest)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{content[language].nextHarvest}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    {formatDate(projectData.nextHarvest)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{content[language].cropType}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-primary" />
                    {projectData.cropType}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Alerts Section */}
            <SectionCard 
              title={content[language].alerts}
              isExpanded={true}
              onToggle={() => {}}
              summary={
                <Badge variant={projectData.alerts.length > 0 ? "destructive" : "outline"}>
                  {projectData.alerts.length}
                </Badge>
              }
            >
              {projectData.alerts.length > 0 ? (
                <div className="space-y-3">
                  {projectData.alerts.map((alert: any) => (
                    <Alert key={alert.id} variant={alert.type === 'error' ? "destructive" : (alert.type === 'warning' ? "warning" : "default")}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>{alert.type}</AlertTitle>
                      <AlertDescription className="flex justify-between">
                        <span>{alert.message}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(alert.timestamp), 'MMM d, HH:mm')}
                        </span>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <InfoIcon className="h-5 w-5 mx-auto mb-2" />
                  {content[language].noAlerts}
                </div>
              )}
            </SectionCard>
            
            {/* Environmental Data Summary */}
            <SectionCard 
              title={content[language].environmentalData}
              isExpanded={true}
              onToggle={() => {}}
              summary={
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(projectData.climate.status)}`}></div>
                  <span className="text-sm">{content[language][projectData.climate.status]}</span>
                </div>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SensorCard 
                  name="Temperature" 
                  value={projectData.sensors.temperature} 
                  unit="°C" 
                  icon={<Thermometer className="w-5 h-5" />}
                  status="normal"
                  progress={65}
                  minValue={15}
                  maxValue={35}
                />
                <SensorCard 
                  name="Humidity" 
                  value={projectData.sensors.humidity} 
                  unit="%" 
                  icon={<Droplet className="w-5 h-5" />}
                  status="normal"
                  progress={64}
                  minValue={0}
                  maxValue={100}
                />
                <SensorCard 
                  name="CO2 Level" 
                  value={projectData.sensors.co2Level} 
                  unit="ppm" 
                  icon={<Wind className="w-5 h-5" />}
                  status="normal"
                  progress={41.5}
                  minValue={0}
                  maxValue={1000}
                />
                <SensorCard 
                  name="Water pH" 
                  value={projectData.sensors.ph} 
                  unit="pH" 
                  icon={<Activity className="w-5 h-5" />}
                  status="warning"
                  progress={62}
                  minValue={0}
                  maxValue={10}
                />
              </div>
            </SectionCard>
          </TabsContent>
          
          {/* Climate Tab */}
          <TabsContent value="climate" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{content[language].climate}</CardTitle>
                    <CardDescription>
                      {content[language].systemStatus}: 
                      <Badge variant={projectData.climate.status === 'normal' ? 'outline' : 'warning'} className="ml-2">
                        {content[language][projectData.climate.status]}
                      </Badge>
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/climate')}
                  >
                    {content[language].viewAll}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {formatClimateData(projectData) && (
                  <ClimateMonitoringCard climateData={formatClimateData(projectData)} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Water Tab */}
          <TabsContent value="water" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{content[language].water}</CardTitle>
                    <CardDescription>
                      {content[language].systemStatus}:
                      <Badge variant={projectData.water.status === 'normal' ? 'outline' : 'warning'} className="ml-2">
                        {content[language][projectData.water.status]}
                      </Badge>
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/water')}
                  >
                    {content[language].viewAll}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {formatWaterData(projectData) && (
                  <WaterMonitoringCard waterData={formatWaterData(projectData)} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* More tabs would be similarly structured */}
          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].sensors}</CardTitle>
                <CardDescription>All connected sensors in this container</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SensorCard 
                    name="Temperature" 
                    value={projectData.sensors.temperature} 
                    unit="°C" 
                    icon={<Thermometer className="w-5 h-5" />}
                    status="normal"
                    progress={65}
                    minValue={15}
                    maxValue={35}
                  />
                  <SensorCard 
                    name="Humidity" 
                    value={projectData.sensors.humidity} 
                    unit="%" 
                    icon={<Droplet className="w-5 h-5" />}
                    status="normal"
                    progress={64}
                    minValue={0}
                    maxValue={100}
                  />
                  <SensorCard 
                    name="CO2 Level" 
                    value={projectData.sensors.co2Level} 
                    unit="ppm" 
                    icon={<Wind className="w-5 h-5" />}
                    status="normal"
                    progress={41.5}
                    minValue={0}
                    maxValue={1000}
                  />
                  <SensorCard 
                    name="Water pH" 
                    value={projectData.sensors.ph} 
                    unit="pH" 
                    icon={<Activity className="w-5 h-5" />}
                    status="warning"
                    progress={62}
                    minValue={0}
                    maxValue={10}
                  />
                  <SensorCard 
                    name="EC" 
                    value={projectData.sensors.ec} 
                    unit="mS/cm" 
                    icon={<Activity className="w-5 h-5" />}
                    status="normal"
                    progress={60}
                    minValue={0}
                    maxValue={3}
                  />
                  <SensorCard 
                    name="TDS" 
                    value={projectData.sensors.tds} 
                    unit="ppm" 
                    icon={<Activity className="w-5 h-5" />}
                    status="normal"
                    progress={68}
                    minValue={0}
                    maxValue={1000}
                  />
                  <SensorCard 
                    name="Water Level" 
                    value={projectData.sensors.waterLevel} 
                    unit="%" 
                    icon={<Droplet className="w-5 h-5" />}
                    status="normal"
                    progress={projectData.sensors.waterLevel}
                    minValue={0}
                    maxValue={100}
                  />
                  <SensorCard 
                    name="Light Level" 
                    value={projectData.sensors.lightLevel} 
                    unit="lux" 
                    icon={<Activity className="w-5 h-5" />}
                    status="normal"
                    progress={75}
                    minValue={0}
                    maxValue={20000}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{projectData.location.name}</CardTitle>
                    <CardDescription>{projectData.location.address}</CardDescription>
                  </div>
                  <Badge variant={projectData.location.status === 'active' ? 'success' : 'warning'} className="capitalize">
                    {projectData.location.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                </div>
                <div className="mt-4">
                  <p><strong>Coordinates:</strong> {projectData.location.lat}, {projectData.location.lng}</p>
                  <p><strong>Container Type:</strong> 40ft Hydroponic Container</p>
                  <p><strong>Installation Date:</strong> January 15, 2025</p>
                </div>
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
