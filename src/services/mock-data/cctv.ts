
import { CCTVCamera } from './types';

// Generate mock CCTV cameras
export const getMockCCTVCameras = (): CCTVCamera[] => {
  return [
    {
      id: "cam1",
      name: "Main Entrance",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 15),
      preview: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png",
      imageUrl: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png",
      lastRecording: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "cam2",
      name: "Container Farm Interior",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 45),
      preview: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
      imageUrl: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
      lastRecording: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
      id: "cam3",
      name: "Storage Area",
      location: "Jakarta Central Farm",
      status: "offline",
      lastMotion: new Date(Date.now() - 1000 * 60 * 120),
      preview: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png",
      imageUrl: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png",
      lastRecording: new Date(Date.now() - 1000 * 60 * 180)
    },
    {
      id: "cam4",
      name: "External Surroundings",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 10),
      preview: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png",
      imageUrl: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png",
      lastRecording: new Date(Date.now() - 1000 * 60 * 20)
    }
  ];
};

// Alias function for backward compatibility
export const getMockCameras = getMockCCTVCameras;

// Function to get a camera by ID
export const getMockCCTVCameraById = (id: string): CCTVCamera | undefined => {
  return getMockCCTVCameras().find(camera => camera.id === id);
};
