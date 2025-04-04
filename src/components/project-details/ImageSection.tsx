
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ContainerProject } from "@/components/containers/ContainerCard";

interface ImageSectionProps {
  container: ContainerProject;
}

const ImageSection = ({ container }: ImageSectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border">
      <img 
        src={container.imageUrl || 'https://via.placeholder.com/1200x600?text=AKAR+Farm'} 
        alt={container.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div className="p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant={
                container.status === 'live' ? "default" : 
                container.status === 'upcoming' ? "outline" : 
                container.status === 'ico' ? "secondary" : 
                "destructive"
              }
              className="uppercase text-xs"
            >
              {container.status}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{container.name}</h1>
          <p className="text-gray-200 mt-1">{container.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
