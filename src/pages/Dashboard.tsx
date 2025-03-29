import { SensorCard } from "@/components/dashboard/SensorCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockSensorData, getMockAlerts, getMockHarvests } from "@/services/mockDataService";
import { Thermometer, Droplet, Wind, Zap, FlaskConical, Waves, AlertCircle, Droplets } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from 'date-fns';

const Dashboard = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const sensorData = getMockSensorData();
  const alerts = getMockAlerts();
  const harvests = getMockHarvests();

  // Get upcoming harvests (status === 'ready')
  const upcomingHarvests = harvests.filter(harvest => harvest.status === 'ready');
  
  // Filter for unread alerts
  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'thermometer': return <Thermometer className="w-5 h-5" />;
      case 'droplet': return <Droplet className="w-5 h-5" />;
      case 'droplets': return <Droplets className="w-5 h-5" />;
      case 'wind': return <Wind className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'flask-conical': return <FlaskConical className="w-5 h-5" />;
      case 'waves': return <Waves className="w-5 h-5" />;
      case 'alert-circle': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">AKAR Farm Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Total Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.length}</div>
            <p className="text-xs text-muted-foreground">
              {sensorData.filter(s => s.status === 'normal').length} normal, 
              {' '}{sensorData.filter(s => s.status === 'warning').length} warnings, 
              {' '}{sensorData.filter(s => s.status === 'error').length} errors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {unreadAlerts.filter(a => a.type === 'error').length} critical issues need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-akar-green">Operational</div>
            <p className="text-xs text-muted-foreground">All systems functioning normally</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Harvests Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingHarvests.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingHarvests.length > 0 
                ? `${upcomingHarvests[0]?.plantName} is ready to harvest` 
                : 'No harvests currently ready'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Sensor Readings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorData.map((sensor) => (
            <SensorCard
              key={sensor.id}
              title={sensor.name}
              value={sensor.value}
              unit={sensor.unit}
              icon={getIconComponent(sensor.iconName)}
              status={sensor.status}
              progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
              minValue={sensor.minValue}
              maxValue={sensor.maxValue}
              lastUpdated={sensor.lastUpdated}
            />
          ))}
        </div>
      </div>

      {/* Quick Look at Alerts and Harvests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No alerts to display</p>
            ) : (
              alerts.slice(0, 3).map(alert => (
                <Alert key={alert.id} variant={
                  alert.type === 'error' ? 'destructive' : 'default'
                }>
                  <div className="flex justify-between items-start">
                    <div>
                      <AlertTitle className="flex items-center gap-2">
                        {alert.title}
                        {!alert.isRead && <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">New</Badge>}
                      </AlertTitle>
                      <AlertDescription>{alert.message}</AlertDescription>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(parseISO(alert.timestamp), 'MMM d, h:mm a')}
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </CardContent>
        </Card>

        {/* Upcoming Harvests */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Harvests</CardTitle>
            <CardDescription>Plants that are ready or soon to be harvested</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingHarvests.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No upcoming harvests</p>
            ) : (
              upcomingHarvests.map(harvest => (
                <div key={harvest.id} className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={harvest.images[0]} 
                      alt={harvest.plantName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{harvest.plantName}</h4>
                    <div className="text-sm text-muted-foreground">
                      Ready for harvest • {harvest.container}
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Ready
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Developer Only Section */}
      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Developer Information</CardTitle>
            <CardDescription>Additional information for AKAR technicians</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">System Uptime:</div>
                <div>124 days, 7 hours, 32 minutes</div>
                <div className="font-medium">Last Maintenance:</div>
                <div>2023-06-15</div>
                <div className="font-medium">Next Scheduled Maintenance:</div>
                <div>2023-08-15</div>
                <div className="font-medium">Container ID:</div>
                <div>AKAR-40-001-JAK</div>
                <div className="font-medium">Firmware Version:</div>
                <div>v2.3.1</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
