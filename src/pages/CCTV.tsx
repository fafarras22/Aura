import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMockCameras } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Camera, RefreshCw, Maximize, History, Settings, Pause, Play, Download, RotateCw, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CCTV = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const cameras = getMockCameras();
  const { toast } = useToast();
  
  const [activeCamera, setActiveCamera] = useState(cameras[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRefresh = () => {
    toast({
      title: "Camera Feeds Refreshed",
      description: "All camera feeds have been updated.",
    });
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Feed Paused" : "Feed Playing",
      description: isPlaying ? "Camera feed has been paused." : "Camera feed is now playing.",
    });
  };

  const handleDownloadFootage = () => {
    toast({
      title: "Download Started",
      description: "Camera footage download has been initiated.",
    });
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRotate = () => {
    toast({
      title: "Camera Rotated",
      description: "Camera view has been rotated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">CCTV Monitoring</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Feeds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main camera display */}
        <div className={`lg:col-span-2 space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}>
          <Card className={`overflow-hidden ${isFullscreen ? 'h-full' : ''}`}>
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>{activeCamera.name}</CardTitle>
                <CardDescription>{activeCamera.location}</CardDescription>
              </div>
              <Badge variant={activeCamera.isOnline ? "default" : "destructive"}>
                {activeCamera.isOnline ? "Online" : "Offline"}
              </Badge>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="relative aspect-video bg-gray-900">
                {activeCamera.isOnline ? (
                  <img 
                    src={activeCamera.lastSnapshot}
                    alt={activeCamera.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Camera className="h-16 w-16 mx-auto mb-2 opacity-30" />
                      <p>Camera Offline</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="opacity-70 hover:opacity-100"
                    onClick={handleFullscreen}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/30 text-white px-2 py-1 rounded text-sm">
                  Live • {new Date().toLocaleTimeString()}
                </div>
              </div>
              <div className="bg-muted p-2 flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={handleTogglePlay}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleRotate}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {isDeveloperMode && (
                    <Button size="sm" variant="ghost" onClick={handleDownloadFootage}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera list and controls */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Camera Feeds</CardTitle>
              <CardDescription>Select a camera to view its feed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cameras.map((camera) => (
                <div 
                  key={camera.id} 
                  className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted transition-colors ${activeCamera.id === camera.id ? 'bg-muted' : ''}`}
                  onClick={() => setActiveCamera(camera)}
                >
                  <div className="w-20 h-16 bg-gray-800 rounded mr-3 overflow-hidden flex-shrink-0">
                    {camera.isOnline ? (
                      <img 
                        src={camera.lastSnapshot} 
                        alt={camera.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="h-6 w-6 opacity-30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{camera.name}</div>
                    <div className="text-sm text-muted-foreground">{camera.location}</div>
                    <Badge variant={camera.isOnline ? "outline" : "destructive"} className="mt-1">
                      {camera.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Tabs defaultValue="live">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="live">Live View</TabsTrigger>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
            </TabsList>
            <TabsContent value="live" className="space-y-4 p-2">
              <div className="text-sm text-muted-foreground">
                <p>Currently viewing: {activeCamera.name}</p>
                <p>Status: {activeCamera.isOnline ? "Online" : "Offline"}</p>
                <p>Location: {activeCamera.location}</p>
              </div>
            </TabsContent>
            <TabsContent value="recordings" className="space-y-4 p-2">
              <div className="text-center py-4">
                <History className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">Access previous recordings</p>
                <Button className="mt-2">Browse Recordings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Camera System Configuration (Admin Only)</CardTitle>
            <CardDescription>Advanced settings for the CCTV system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Camera Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <History className="mr-2 h-4 w-4" />
                  Recording Archive
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Access Control
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Storage usage: 46% (1.2TB of 2.6TB)</p>
                <p>Retention policy: 30 days</p>
                <p>Last system check: 2023-07-10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CCTV;
