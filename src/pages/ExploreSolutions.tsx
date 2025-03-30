import React, { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleDollarSign, Leaf, Droplet, Zap, MapPin, MailOpen, Calculator, ArrowRight, Flower, Thermometer } from "lucide-react";

// Define form schema for quotation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  location: z.string().min(2, { message: "Please specify your location." }),
  containerSize: z.string(),
  cropType: z.string(),
  additionalFeatures: z.array(z.string()).optional(),
  message: z.string().optional(),
});

const containerOptions = [
  {
    id: "small",
    title: "Small Container",
    description: "Perfect for small businesses and entrepreneurs",
    specs: [
      "20ft Container",
      "Up to 1,200 plants",
      "28 sqm growing space",
      "220V electrical system",
      "Basic climate control",
    ],
    price: "IDR 450,000,000",
    image: "/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
  },
  {
    id: "medium",
    title: "Medium Container",
    description: "Ideal for growing businesses and local suppliers",
    specs: [
      "40ft Container",
      "Up to 2,400 plants",
      "56 sqm growing space",
      "Three-phase electrical system",
      "Advanced climate control",
      "Remote monitoring system"
    ],
    price: "IDR 750,000,000",
    best: true,
    image: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png"
  },
  {
    id: "large",
    title: "Large Container",
    description: "Commercial-scale solution for serious producers",
    specs: [
      "2x40ft Containers",
      "Up to 5,000 plants",
      "112 sqm growing space",
      "Premium climate control system",
      "Full automation",
      "AI growth optimization",
      "Blockchain integration"
    ],
    price: "IDR 1,250,000,000",
    image: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png"
  }
];

const crops = [
  { value: "lettuce", label: "Lettuce" },
  { value: "spinach", label: "Spinach" },
  { value: "kale", label: "Kale" },
  { value: "arugula", label: "Arugula" },
  { value: "herbs", label: "Herbs" },
  { value: "microgreens", label: "Microgreens" },
  { value: "custom", label: "Custom Mix" }
];

const features = [
  { id: "solar", label: "Solar Power System" },
  { id: "rainwater", label: "Rainwater Collection" },
  { id: "ai", label: "AI Optimization" },
  { id: "remote", label: "Remote Monitoring" },
  { id: "tokenization", label: "Blockchain Tokenization" },
];

const ExploreSolutions = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      containerSize: "",
      cropType: "",
      additionalFeatures: [],
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, this would send the quotation request to the server
    alert("Your quotation request has been submitted. Our team will contact you soon!");
    form.reset();
  }

  // Content translations
  const content = {
    en: {
      title: "AKAR Container Farm Solutions",
      subtitle: "Explore our innovative container farming solutions",
      quotation: "Request Quotation",
      features: "Key Features",
      benefits: "Benefits",
      specifications: "Specifications",
      selectContainer: "Select a container size to begin",
      requestQuote: "Request a Quote",
    },
    id: {
      title: "Solusi Pertanian Kontainer AKAR",
      subtitle: "Jelajahi solusi pertanian kontainer inovatif kami",
      quotation: "Minta Penawaran",
      features: "Fitur Utama",
      benefits: "Manfaat",
      specifications: "Spesifikasi",
      selectContainer: "Pilih ukuran kontainer untuk memulai",
      requestQuote: "Minta Penawaran",
    },
    ko: {
      title: "아카르 컨테이너 농장 솔루션",
      subtitle: "혁신적인 컨테이너 농업 솔루션을 살펴보세요",
      quotation: "견적 요청",
      features: "주요 기능",
      benefits: "이점",
      specifications: "사양",
      selectContainer: "시작하려면 컨테이너 크기를 선택하세요",
      requestQuote: "견적 요청",
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <HomeHeader language={language} setLanguage={setLanguage} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/10">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-800 dark:text-green-300">
                {content[language].title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {content[language].subtitle}
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                {content[language].quotation} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Container Options */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Choose Your Container Farm
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {containerOptions.map((container) => (
                <Card 
                  key={container.id} 
                  className={`relative overflow-hidden h-full flex flex-col ${
                    container.best ? 'border-green-500 dark:border-green-600 shadow-lg' : ''
                  }`}
                >
                  {container.best && (
                    <div className="absolute top-0 right-0">
                      <Badge className="m-2 bg-green-500 hover:bg-green-600">Most Popular</Badge>
                    </div>
                  )}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={container.image || "/placeholder.svg"} 
                      alt={container.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{container.title}</CardTitle>
                    <CardDescription>{container.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                      {container.price}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {container.specs.map((spec, index) => (
                        <li key={index} className="flex items-start">
                          <Leaf className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setSelectedContainer(container.id);
                        form.setValue("containerSize", container.id);
                        document.getElementById("quotation-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Select This Container
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features & Benefits */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Why Choose AKAR Container Farms?
            </h2>
            
            <Tabs defaultValue="features" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">{content[language].features}</TabsTrigger>
                <TabsTrigger value="benefits">{content[language].benefits}</TabsTrigger>
                <TabsTrigger value="specifications">{content[language].specifications}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                        <Flower className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Vertical Farming Technology</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Maximize growing space with our vertical rack systems, allowing up to 3x more produce per square meter compared to traditional farming.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                        <Droplet className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Hydroponic Systems</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Water-efficient hydroponic technology uses up to 95% less water than conventional agriculture while delivering nutrient-rich produce.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                        <Thermometer className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Climate Control</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Perfect growing conditions year-round with automated temperature, humidity, and CO2 control systems regardless of external weather.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                        <CircleDollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Blockchain Integration</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Revolutionary tokenization on Polygon MATIC enables fractional ownership and transparent supply chain tracking.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="benefits" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-3">
                        <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-lg">Reduced Operating Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Save up to 30% on operational expenses compared to traditional farming with automated systems and efficient resource usage.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="h-full">
                    <CardHeader>
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-3">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-lg">Urban Deployment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Place farms directly in urban areas to eliminate transportation costs and provide ultra-fresh produce to local markets.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="h-full">
                    <CardHeader>
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-3">
                        <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-lg">Sustainable Business</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Build a future-proof business with environmentally friendly practices that appeal to eco-conscious consumers and investors.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-green-100 dark:bg-green-900/50">
                        <th className="border p-2 text-left">Specification</th>
                        <th className="border p-2 text-left">Small (20ft)</th>
                        <th className="border p-2 text-left">Medium (40ft)</th>
                        <th className="border p-2 text-left">Large (2x40ft)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="border p-2 font-medium">Growing Area</td>
                        <td className="border p-2">28 sqm</td>
                        <td className="border p-2">56 sqm</td>
                        <td className="border p-2">112 sqm</td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="border p-2 font-medium">Plant Capacity</td>
                        <td className="border p-2">Up to 1,200</td>
                        <td className="border p-2">Up to 2,400</td>
                        <td className="border p-2">Up to 5,000</td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="border p-2 font-medium">Power Requirement</td>
                        <td className="border p-2">3.5 kW</td>
                        <td className="border p-2">7 kW</td>
                        <td className="border p-2">14 kW</td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="border p-2 font-medium">Water Usage</td>
                        <td className="border p-2">30-50L/day</td>
                        <td className="border p-2">60-100L/day</td>
                        <td className="border p-2">120-200L/day</td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="border p-2 font-medium">Harvest Cycles</td>
                        <td className="border p-2">12-15 per year</td>
                        <td className="border p-2">12-15 per year</td>
                        <td className="border p-2">12-15 per year</td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="border p-2 font-medium">Annual Yield</td>
                        <td className="border p-2">~2,500 kg</td>
                        <td className="border p-2">~5,000 kg</td>
                        <td className="border p-2">~10,000 kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Request Quotation Form */}
        <section id="quotation-form" className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                {content[language].requestQuote}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                {selectedContainer 
                  ? `You've selected the ${containerOptions.find(c => c.id === selectedContainer)?.title}` 
                  : content[language].selectContainer}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="containerSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Container Size</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a container size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="small">Small (20ft)</SelectItem>
                                <SelectItem value="medium">Medium (40ft)</SelectItem>
                                <SelectItem value="large">Large (2x40ft)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cropType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Crop Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select crops" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {crops.map((crop) => (
                                  <SelectItem key={crop.value} value={crop.value}>
                                    {crop.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="additionalFeatures"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Additional Features</FormLabel>
                            <FormDescription>
                              Select any additional features you're interested in
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature) => (
                              <FormField
                                key={feature.id}
                                control={form.control}
                                name="additionalFeatures"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={feature.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(feature.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value || [], feature.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== feature.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
                                        {feature.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Tell us more about your project, requirements, or questions..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-center">
                      <Button type="submit" size="lg" className="px-8">
                        Submit Quotation Request <MailOpen className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Calculator Section */}
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                ROI Calculator
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Calculate your potential return on investment with an AKAR Container Farm
              </p>
              <Button variant="outline" size="lg" className="gap-2">
                <Calculator className="h-5 w-5" />
                Launch ROI Calculator
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default ExploreSolutions;
