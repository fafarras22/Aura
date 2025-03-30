
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, AlertTriangle, Settings, Plus, Eye, Download, MoreVertical, Maximize2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getMockCCTVCameras, CCTVCamera } from "@/services/mockDataService";

const CCTV = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const cameras = getMockCCTVCameras();
  
  const handleCameraSelect = (cameraId: string) => {
    setSelectedCamera(cameraId);
  };
  
  const activeCamera = selectedCamera 
    ? cameras.find(camera => camera.id === selectedCamera) 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CCTV Monitoring</h1>
          <p className="text-muted-foreground">Live camera feeds from all container farm locations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">4 Online</Badge>
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">2 Offline</Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Camera
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Camera</DialogTitle>
                <DialogDescription>
                  Connect a new camera to the monitoring system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <p className="text-sm text-muted-foreground">Camera configuration interface would be here.</p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Add Camera</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Maintenance Notice</AlertTitle>
        <AlertDescription>
          Scheduled camera system maintenance on June 30, 2023. Some cameras may be offline during this period.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main camera display */}
        <Card className="col-span-1 lg:col-span-2 lg:row-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{activeCamera ? activeCamera.name : 'Select a Camera'}</CardTitle>
                <CardDescription>{activeCamera ? activeCamera.location : 'No camera selected'}</CardDescription>
              </div>
              {activeCamera && (
                <Badge variant={activeCamera.status === 'online' ? 'default' : 'destructive'}>
                  {activeCamera.status.toUpperCase()}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden">
              {activeCamera ? (
                <>
                  <img 
                    src={`/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png`} 
                    alt={`Camera feed from ${activeCamera.name}`}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-black/50 text-white border-transparent hover:bg-black/70 hover:border-white">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-black/50 text-white border-transparent hover:bg-black/70 hover:border-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/50 rounded text-xs text-white">
                    <Clock className="h-3 w-3" />
                    <span>Live</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded text-xs text-white">
                    {new Date().toLocaleTimeString()}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Eye className="h-16 w-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Select a camera to view the feed</p>
                  <p className="text-sm">Choose from the available cameras in the sidebar</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-3">
            <div className="text-sm text-muted-foreground">
              {activeCamera && (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last motion: {activeCamera.lastMotion}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={!activeCamera}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!activeCamera}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View History</DropdownMenuItem>
                  <DropdownMenuItem>Export Footage</DropdownMenuItem>
                  <DropdownMenuItem>Adjust Sensitivity</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </Card>
        
        {/* Camera selection sidebar */}
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Available Cameras</CardTitle>
            <CardDescription>Select a camera to view its feed</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mx-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="indoor">Indoor</TabsTrigger>
                <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="m-0">
                <div className="divide-y">
                  {cameras.map((camera) => (
                    <div 
                      key={camera.id} 
                      className={`flex items-center justify-between p-4 hover:bg-muted cursor-pointer ${
                        camera.id.toString() === selectedCamera ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleCameraSelect(camera.id)}
                    >
                      <div>
                        <h4 className="font-medium">{camera.name}</h4>
                        <p className="text-sm text-muted-foreground">{camera.location}</p>
                      </div>
                      <Badge variant={camera.status === 'online' ? 'outline' : 'destructive'} className="ml-2">
                        {camera.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="indoor" className="m-0">
                <div className="divide-y">
                  {cameras.filter(cam => cam.location.includes('Internal')).map((camera) => (
                    <div 
                      key={camera.id} 
                      className={`flex items-center justify-between p-4 hover:bg-muted cursor-pointer ${
                        camera.id.toString() === selectedCamera ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleCameraSelect(camera.id)}
                    >
                      <div>
                        <h4 className="font-medium">{camera.name}</h4>
                        <p className="text-sm text-muted-foreground">{camera.location}</p>
                      </div>
                      <Badge variant={camera.status === 'online' ? 'outline' : 'destructive'} className="ml-2">
                        {camera.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="outdoor" className="m-0">
                <div className="divide-y">
                  {cameras.filter(cam => cam.location.includes('External')).map((camera) => (
                    <div 
                      key={camera.id} 
                      className={`flex items-center justify-between p-4 hover:bg-muted cursor-pointer ${
                        camera.id.toString() === selectedCamera ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleCameraSelect(camera.id)}
                    >
                      <div>
                        <h4 className="font-medium">{camera.name}</h4>
                        <p className="text-sm text-muted-foreground">{camera.location}</p>
                      </div>
                      <Badge variant={camera.status === 'online' ? 'outline' : 'destructive'} className="ml-2">
                        {camera.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CCTV;
