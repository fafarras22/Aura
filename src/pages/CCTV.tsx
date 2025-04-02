
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Camera, Search, Maximize2, Download, MoreVertical, Play, Pause, RotateCw, Calendar, Clock, Filter, Edit, Trash, Users, Settings, Lock } from "lucide-react";
import { getMockCCTVCameras } from "@/services/mock-data/cctv";

const CCTV = () => {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  
  const cameras = getMockCCTVCameras();
  
  // Filter cameras based on search term
  const filteredCameras = cameras.filter(camera => 
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get selected camera details
  const selectedCameraDetails = selectedCamera 
    ? cameras.find(camera => camera.id === selectedCamera) 
    : cameras[0];

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>CCTV Monitoring | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">CCTV Monitoring</h1>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cameras..."
                className="pl-8 w-[200px] md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="grid" className="px-3">
                  <div className="grid grid-cols-2 gap-0.5 h-4 w-4 mr-2"></div>
                  Grid
                </TabsTrigger>
                <TabsTrigger value="single" className="px-3">
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Single
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Cameras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {cameras.filter(camera => camera.status === 'online').length}
              </div>
              <p className="text-sm text-muted-foreground">
                {cameras.filter(camera => camera.status === 'online').length} of {cameras.length} cameras online
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Motion Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">12</div>
              <p className="text-sm text-muted-foreground">
                Detected in the last 24 hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">68%</div>
              <p className="text-sm text-muted-foreground">
                1.2 TB available of 4 TB
              </p>
            </CardContent>
          </Card>
        </div>
        
        {view === "grid" ? (
          <Card>
            <CardHeader>
              <CardTitle>Camera Grid</CardTitle>
              <CardDescription>Live feeds from all cameras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredCameras.map((camera) => (
                  <Card key={camera.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={camera.imageUrl || camera.preview} 
                        alt={camera.name} 
                        className="w-full h-48 object-cover"
                        onClick={() => {
                          setSelectedCamera(camera.id);
                          setView("single");
                        }}
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Badge 
                          variant={camera.status === 'online' ? 'success' : 'outline'}
                          className="bg-black/50 backdrop-blur-sm"
                        >
                          {camera.status === 'online' ? 'Live' : 'Offline'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-sm">{camera.name}</h3>
                          <p className="text-xs text-muted-foreground">{camera.location}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" /> View Recordings
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" /> Settings
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredCameras.length === 0 && (
                <div className="text-center py-12">
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-muted-foreground">No cameras found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Card className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={selectedCameraDetails?.imageUrl || selectedCameraDetails?.preview} 
                    alt={selectedCameraDetails?.name} 
                    className="w-full h-[60vh] object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge 
                      variant={selectedCameraDetails?.status === 'online' ? 'success' : 'outline'}
                      className="bg-black/50 backdrop-blur-sm"
                    >
                      {selectedCameraDetails?.status === 'online' ? 'Live' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-medium">{selectedCameraDetails?.name}</h2>
                        <p className="text-sm text-gray-300">{selectedCameraDetails?.location}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent border-gray-600 text-white hover:bg-white/10">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent border-gray-600 text-white hover:bg-white/10">
                          <Pause className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent border-gray-600 text-white hover:bg-white/10">
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent border-gray-600 text-white hover:bg-white/10">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Camera Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Camera ID</p>
                        <p>{selectedCameraDetails?.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{selectedCameraDetails?.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant={selectedCameraDetails?.status === 'online' ? 'success' : 'destructive'}>
                          {selectedCameraDetails?.status === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Motion Detected</p>
                        <p>{selectedCameraDetails?.lastMotion.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Recording</p>
                        <p>{selectedCameraDetails?.lastRecording.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Storage Usage</p>
                        <p>128 GB (24% of allocation)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Camera List</CardTitle>
                  <CardDescription>Select a camera to view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cameras.map((camera) => (
                      <div 
                        key={camera.id} 
                        className={`p-2 rounded flex items-center cursor-pointer hover:bg-muted transition-colors ${selectedCamera === camera.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedCamera(camera.id)}
                      >
                        <div className="relative h-10 w-10 mr-3 flex-shrink-0">
                          <img 
                            src={camera.preview} 
                            alt={camera.name} 
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${camera.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{camera.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{camera.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Recordings Archive
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Access Control
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="mr-2 h-4 w-4" />
                      Security Logs
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Camera Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CCTV;
