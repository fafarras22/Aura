import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, History, Maximize2, RotateCcw, Calendar, Bell, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { getMockCCTVCameras } from "@/services/mockDataService";

// Fix for CCTV.tsx to handle date formatting
const formatDate = (date: Date): string => {
  return date.toLocaleString();
};

const CCTV = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const cctvCameras = getMockCCTVCameras();

  const filteredCameras = cctvCameras.filter((camera) =>
    camera.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCameraSelect = (camera) => {
    setSelectedCamera(camera);
    setIsDialogOpen(true);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        setDownloadProgress(0);
      }
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CCTV</h1>
          <p className="text-muted-foreground">
            Live camera feeds and historical footage from the container farm
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">
            <Camera className="mr-2 h-4 w-4" />
            {cctvCameras.length} Cameras
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Camera Overview</CardTitle>
          <CardDescription>
            Real-time and historical footage from the container farm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="live">Live View</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-4">
              <Input
                type="search"
                placeholder="Search cameras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCameras.map((camera) => (
                  <Card key={camera.id} className="cursor-pointer" onClick={() => handleCameraSelect(camera)}>
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-sm font-medium">{camera.name}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        {camera.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="aspect-video overflow-hidden">
                      <img
                        src={camera.imageUrl}
                        alt={camera.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cctvCameras.map((camera) => (
                  <Card key={camera.id}>
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-sm font-medium">{camera.name}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        {camera.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <History className="h-4 w-4" />
                        <p className="text-sm">
                          Last recording: {formatDate(camera.lastRecording)}
                        </p>
                      </div>
                      <Button variant="outline" className="w-full justify-center">
                        View History
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{selectedCamera?.name}</DialogTitle>
            <DialogDescription>
              {selectedCamera?.location} - {selectedCamera?.status}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video overflow-hidden rounded-md">
            {selectedCamera && (
              <img
                src={selectedCamera.imageUrl}
                alt={selectedCamera.name}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Rotate Camera
            </Button>
            <Button variant="outline">
              <Maximize2 className="mr-2 h-4 w-4" />
              Full Screen
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Set Alert
            </Button>
          </div>
          <Button className="w-full" disabled={isDownloading} onClick={handleDownload}>
            {isDownloading ? (
              <>
                Downloading...
                <Progress value={downloadProgress} className="mt-2" />
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Footage
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CCTV;
