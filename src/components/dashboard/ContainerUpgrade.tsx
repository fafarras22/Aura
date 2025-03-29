
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Container, Plus, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const containerOptions = [
  {
    id: "container-40",
    name: "40-Foot Container",
    description: "Our standard container farm - 6-7 tons of produce per year",
    price: "$85,000",
    features: [
      "250 sq ft growing area",
      "Up to 7 tons annual yield",
      "Automated climate control",
      "Remote monitoring system",
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
  },
  {
    id: "container-40-pro",
    name: "40-Foot Container PRO",
    description: "Enhanced production - 8-9 tons of produce per year",
    price: "$120,000",
    features: [
      "280 sq ft growing area",
      "Up to 9 tons annual yield",
      "Advanced nutrient delivery system",
      "Enhanced LED lighting",
      "Premium insulation",
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    badge: "Recommended"
  },
  {
    id: "container-53",
    name: "53-Foot Container",
    description: "Largest capacity - 10-12 tons of produce per year",
    price: "$165,000",
    features: [
      "350 sq ft growing area",
      "Up to 12 tons annual yield",
      "Dual climate zones",
      "Commercial-grade water filtration",
      "Solar power integration option",
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
  },
];

export const ContainerUpgrade = () => {
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();

  const handlePurchase = () => {
    setIsConfirmOpen(false);
    
    toast({
      title: "Purchase Initiated",
      description: "Your container upgrade request has been sent to AKAR. A representative will contact you shortly.",
      duration: 5000,
    });
  };

  return (
    <Card className="border-akar-green/20 shadow-lg mb-8">
      <CardHeader className="bg-gradient-to-r from-akar-lightgreen/10 to-akar-green/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Container className="text-akar-green h-6 w-6" />
          <CardTitle className="text-xl">Upgrade Your Farm</CardTitle>
        </div>
        <CardDescription>
          Expand your capacity with additional AKAR farm containers
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {containerOptions.map((container) => (
              <CarouselItem key={container.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className={`h-full border ${
                    selectedContainer === container.id 
                      ? "border-akar-green ring-2 ring-akar-green/30" 
                      : "border-border hover:border-akar-lightgreen/50"
                  } transition-all duration-300`}
                >
                  {container.badge && (
                    <Badge className="absolute right-3 top-3 z-10 bg-akar-green" variant="default">
                      {container.badge}
                    </Badge>
                  )}

                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={container.images[0]}
                      alt={container.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-semibold">
                      {container.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {container.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="py-0">
                    <p className="font-semibold text-lg">{container.price}</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {container.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-akar-green mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {container.features.length > 3 && (
                        <li className="text-sm text-muted-foreground pl-6">
                          +{container.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button 
                      variant={selectedContainer === container.id ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => setSelectedContainer(container.id)}
                    >
                      {selectedContainer === container.id ? "Selected" : "Select"}
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="static translate-y-0 mx-2" />
            <CarouselNext className="static translate-y-0 mx-2" />
          </div>
        </Carousel>
      </CardContent>
      <CardFooter className="flex justify-end pb-6">
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogTrigger asChild>
            <Button 
              className="px-8" 
              disabled={!selectedContainer}
              onClick={() => selectedContainer && setIsConfirmOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> 
              Purchase Container
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Your Container Purchase</DialogTitle>
              <DialogDescription>
                You're about to request the purchase of a new AKAR container farm. Our team will contact you shortly to finalize details.
              </DialogDescription>
            </DialogHeader>
            
            {selectedContainer && (
              <div className="py-4">
                <div className="rounded-md border p-4 mb-4">
                  <h4 className="font-medium">
                    {containerOptions.find(c => c.id === selectedContainer)?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {containerOptions.find(c => c.id === selectedContainer)?.description}
                  </p>
                  <p className="font-semibold mt-2">
                    {containerOptions.find(c => c.id === selectedContainer)?.price}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  By confirming, an AKAR representative will contact you with payment details and delivery information.
                </p>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePurchase}>
                Confirm Purchase
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
