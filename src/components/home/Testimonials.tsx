
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Investor",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      content: "AKAR Farm has transformed how I invest in agriculture. The transparency and sustainable focus gives me confidence in my investments.",
    },
    {
      name: "David Chen",
      role: "Financial Advisor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "I recommend AKAR to clients looking for alternative investments. The real-world agriculture backing provides stability while supporting valuable causes.",
    },
    {
      name: "Ratna Dewi",
      role: "Farm Owner",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "Partnering with AKAR allowed me to expand my farming operations with access to capital I couldn't get elsewhere. Game-changing for local farmers.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of investors and farmers who are building a more sustainable future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
