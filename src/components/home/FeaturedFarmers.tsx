
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FarmerProfile {
  name: string;
  location: string;
  projectType: string;
  imageUrl?: string;
  quote: string;
}

export const FeaturedFarmers: React.FC = () => {
  const farmers: FarmerProfile[] = [
    {
      name: "Adi Suryanto",
      location: "Bandung, Indonesia",
      projectType: "Rice Field Innovation",
      imageUrl: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
      quote: "AKAR helped me transform my traditional rice fields into a high-yield, sustainable operation. The funding has increased my harvest by 35%."
    },
    {
      name: "Mai Tran",
      location: "Mekong Delta, Vietnam",
      projectType: "Aquaculture",
      imageUrl: "/lovable-uploads/1fe7dc27-86fd-4951-be87-72e09e824c9b.png",
      quote: "Our fishery project went from struggling to thriving after AKAR investors funded our expansion. We're now the largest sustainable fish farm in our province."
    },
    {
      name: "Somchai Wattana",
      location: "Chiang Mai, Thailand",
      projectType: "Container Farming",
      imageUrl: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png",
      quote: "Container farming has revolutionized how we grow vegetables year-round. With AKAR's funding and technology, our productivity has tripled."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Farmers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the farmers and agricultural entrepreneurs whose projects are transforming ASEAN agriculture with AKAR funding
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmers.map((farmer, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                  <AvatarImage src={farmer.imageUrl} alt={farmer.name} />
                  <AvatarFallback>{farmer.name[0]}{farmer.name.split(' ')[1]?.[0]}</AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold">{farmer.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{farmer.projectType}</p>
                <p className="text-xs text-muted-foreground mb-4">{farmer.location}</p>
                
                <blockquote className="italic text-sm border-l-2 border-primary pl-4 text-left">
                  "{farmer.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
