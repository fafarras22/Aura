
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Angel Investor",
      image: "/lovable-uploads/b795ce5f-6c21-4dec-8060-90844a893974.png",
      content: "AKAR Farm has transformed how I think about agricultural investments. The transparency and real-world impact make this platform truly unique.",
      stars: 5
    },
    {
      id: 2,
      name: "Michael Tanaka",
      role: "Portfolio Manager",
      image: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
      content: "The returns on AKAR farm projects have consistently outperformed my traditional investments. The platform makes it easy to diversify into sustainable agriculture.",
      stars: 5
    },
    {
      id: 3,
      name: "Nadia Rahman",
      role: "ESG Investment Advisor",
      image: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png",
      content: "For clients looking for impact without sacrificing returns, AKAR's agricultural projects provide exactly what they need - real impact with transparent metrics.",
      stars: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Investors Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of investors funding the future of sustainable agriculture
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
