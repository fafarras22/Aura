
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Camera, AlertTriangle, Clock, CalendarDays, ArrowUpRight, Download, Play, Pause, Maximize, SkipForward, SkipBack } from "lucide-react";
import { getMockCameras } from "@/services/mockDataService";

const CCTV = () => {
  const { toast } = useToast();
  const [activeCamera, setActiveCamera] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const cameras = getMockCameras();

  // Set the first camera as active if none selected
  React.useEffect(() => {
    if (cameras.length > 0 && !activeCamera) {
      setActiveCamera(cameras[0].id);
    }
  }, [cameras, activeCamera]);

  const selectedCamera = cameras.find(cam => cam.id === activeCamera);

  const handleStreamToggle = () => {
    setIsPlaying(!isPlaying);
    
    toast({
      title: isPlaying ? "Paused camera stream" : "Playing camera stream",
      description: `Camera ${selectedCamera?.name} ${isPlaying ? "paused" : "streaming"}.`,
      duration: 3000,
    });
  };

  const handleSnapshot = () => {
    toast({
      title: "Snapshot captured",
      description: `Snapshot from ${selectedCamera?.name} has been saved.`,
      duration: 3000,
    });
  };

  const isOnline = (status: string) => status === 'online';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">CCTV Monitoring</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span> 
          {cameras.filter(cam => isOnline(cam.status)).length}/{cameras.length} Cameras Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main camera feed */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="relative bg-gray-900 aspect-video">
              {selectedCamera ? (
                <>
                  <img 
                    src={selectedCamera.lastSnapshot} 
                    alt={`Feed from ${selectedCamera.name}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <Badge 
                      variant={isOnline(selectedCamera.status) ? "default" : "destructive"}
                      className="bg-black/50 backdrop-blur-sm"
                    >
                      {isOnline(selectedCamera.status) ? "LIVE" : "OFFLINE"}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="bg-black/50 backdrop-blur-sm text-white border-white/20"
                    >
                      {selectedCamera.name}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/30 border-white/20 text-white hover:bg-black/50"
                          onClick={handleStreamToggle}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/30 border-white/20 text-white hover:bg-black/50"
                        >
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/30 border-white/20 text-white hover:bg-black/50"
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/30 border-white/20 text-white hover:bg-black/50"
                          onClick={handleSnapshot}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/30 border-white/20 text-white hover:bg-black/50"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white/70 text-center">
                    <Camera className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No camera selected</p>
                  </div>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              {selectedCamera && (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedCamera.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCamera.location}</p>
                    </div>
                    <Badge 
                      variant={isOnline(selectedCamera.status) ? "outline" : "destructive"}
                      className={isOnline(selectedCamera.status) ? "bg-green-50 text-green-700" : ""}
                    >
                      {selectedCamera.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-2 gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Last updated: {selectedCamera.lastUpdated}</span>
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-primary p-0 h-auto"
                    >
                      View footage history
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="mt-4 border-0 shadow-sm">
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Time Controls</CardTitle>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>Today, {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-0">
              <div className="relative h-12 bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-primary/10 border-r-2 border-primary"></div>
                {/* Time markers */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-0 bottom-0" 
                    style={{ left: `${(i / 24) * 100}%` }}
                  >
                    <div className="h-full w-px bg-slate-300 dark:bg-slate-700"></div>
                    <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-muted-foreground">
                      {i}:00
                    </div>
                  </div>
                ))}
                {/* Current time indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-px bg-primary" 
                  style={{ left: '33%' }}
                >
                  <div className="absolute -top-1 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera list */}
        <div>
          <Tabs defaultValue="all">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All Cameras</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="offline">Offline</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="m-0">
              <ScrollArea className="h-[550px] pr-4">
                <div className="space-y-2">
                  {cameras.map((camera) => (
                    <Card 
                      key={camera.id}
                      className={`cursor-pointer transition-all ${
                        activeCamera === camera.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30'
                      }`}
                      onClick={() => setActiveCamera(camera.id)}
                    >
                      <CardContent className="p-3 flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={camera.lastSnapshot} 
                            alt={camera.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{camera.name}</h4>
                            <Badge 
                              variant={isOnline(camera.status) ? "outline" : "secondary"}
                              className={`text-xs ${
                                isOnline(camera.status) 
                                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                              }`}
                            >
                              {camera.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{camera.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Updated: {camera.lastUpdated}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="online" className="m-0">
              <ScrollArea className="h-[550px] pr-4">
                <div className="space-y-2">
                  {cameras.filter(cam => isOnline(cam.status)).map((camera) => (
                    <Card 
                      key={camera.id}
                      className={`cursor-pointer transition-all ${
                        activeCamera === camera.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30'
                      }`}
                      onClick={() => setActiveCamera(camera.id)}
                    >
                      <CardContent className="p-3 flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={camera.lastSnapshot} 
                            alt={camera.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{camera.name}</h4>
                            <Badge 
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            >
                              ONLINE
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{camera.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Updated: {camera.lastUpdated}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="offline" className="m-0">
              <ScrollArea className="h-[550px] pr-4">
                <div className="space-y-2">
                  {cameras.filter(cam => !isOnline(cam.status)).map((camera) => (
                    <Card 
                      key={camera.id}
                      className={`cursor-pointer transition-all ${
                        activeCamera === camera.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30'
                      }`}
                      onClick={() => setActiveCamera(camera.id)}
                    >
                      <CardContent className="p-3 flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                          <img 
                            src={camera.lastSnapshot} 
                            alt={camera.name}
                            className="w-full h-full object-cover opacity-60"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-yellow-500" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{camera.name}</h4>
                            <Badge 
                              variant="secondary"
                              className="text-xs"
                            >
                              {camera.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{camera.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Updated: {camera.lastUpdated}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CCTV;
