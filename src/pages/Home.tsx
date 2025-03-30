import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, SproutIcon, DropletIcon, LineChart, Sparkles, ShoppingCart, MapPin, Instagram, Linkedin, Twitter, Languages } from "lucide-react";
import { AppleButton } from "@/components/ui/apple-button";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IndonesiaMap } from "@/components/home/IndonesiaMap";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  // Language content
  const content = {
    en: {
      hero: {
        title: "Container Farming. Tokenized.",
        subtitle: "Revolutionary urban farming technology meets blockchain investment. Sustainable farming now accessible to everyone.",
        explore: "Explore Solutions",
        learnMore: "Learn More"
      },
      about: {
        title: "About AKAR",
        description: "Smart container technology. Blockchain powered. Future of farming."
      },
      tokenization: {
        title: "Invest in Agriculture's Future",
        description: "Own a stake in container farms through secure blockchain technology. Simple. Transparent. Rewarding."
      }
    },
    id: {
      hero: {
        title: "Pertanian Kontainer. Tertokenisasi.",
        subtitle: "Teknologi pertanian urban revolusioner bertemu investasi blockchain. Pertanian berkelanjutan kini dapat diakses semua orang.",
        explore: "Jelajahi Solusi",
        learnMore: "Pelajari Lebih Lanjut"
      },
      about: {
        title: "Tentang AKAR",
        description: "Teknologi kontainer pintar. Didukung blockchain. Masa depan pertanian."
      },
      tokenization: {
        title: "Investasi di Masa Depan Pertanian",
        description: "Miliki saham di pertanian kontainer melalui teknologi blockchain yang aman. Sederhana. Transparan. Menguntungkan."
      }
    }
  };

  // 3D Container Farm visualization
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      40, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(5, 3, 5);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4CAF50,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Container Farm
    const containerGroup = new THREE.Group();
    
    // Main container
    const containerGeometry = new THREE.BoxGeometry(2, 2.5, 6);
    const containerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      roughness: 0.7,
      metalness: 0.3
    });
    const container = new THREE.Mesh(containerGeometry, containerMaterial);
    container.position.y = 1.25;
    container.castShadow = true;
    container.receiveShadow = true;
    containerGroup.add(container);
    
    // Container details
    const doorGeometry = new THREE.PlaneGeometry(0.8, 2);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4CAF50,
      roughness: 0.5,
      metalness: 0.5
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 0, 3.01);
    door.castShadow = true;
    containerGroup.add(door);
    
    // Solar panels
    const panelGeometry = new THREE.BoxGeometry(2.2, 0.1, 6.2);
    const panelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2E7D32,
      roughness: 0.3,
      metalness: 0.8
    });
    const solarPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    solarPanel.position.y = 2.6;
    solarPanel.castShadow = true;
    containerGroup.add(solarPanel);
    
    // Windows
    for (let i = -2; i <= 2; i += 2) {
      const windowGeometry = new THREE.PlaneGeometry(0.6, 0.6);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xaaddff,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.7
      });
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(1.01, 1.5, i);
      window1.rotation.y = -Math.PI / 2;
      containerGroup.add(window1);
      
      const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
      window2.position.set(-1.01, 1.5, i);
      window2.rotation.y = Math.PI / 2;
      containerGroup.add(window2);
    }
    
    scene.add(containerGroup);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Header/Navigation */}
      <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
              alt="AKAR Logo" 
              className="h-10"
            />
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                {language === 'en' ? 'About' : 'Tentang'}
              </a>
              <a href="#solutions" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                {language === 'en' ? 'Solutions' : 'Solusi'}
              </a>
              <a href="#technology" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                {language === 'en' ? 'Technology' : 'Teknologi'}
              </a>
              <a href="#tokenization" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                {language === 'en' ? 'Tokenization' : 'Tokenisasi'}
              </a>
              <a href="#indonesia" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                {language === 'en' ? 'Indonesia Impact' : 'Dampak Indonesia'}
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Languages className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div className="grid gap-1">
                    <Button 
                      variant={language === 'en' ? "default" : "ghost"} 
                      onClick={() => setLanguage('en')}
                      className="justify-start"
                    >
                      English
                    </Button>
                    <Button 
                      variant={language === 'id' ? "default" : "ghost"} 
                      onClick={() => setLanguage('id')}
                      className="justify-start"
                    >
                      Indonesia
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Sign in' : 'Masuk'}
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="apple" size="sm" className="rounded-full">
                  {language === 'en' ? 'Dashboard' : 'Dasbor'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative w-full min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white to-accent/20 dark:from-gray-950 dark:via-gray-950 dark:to-accent/5"></div>
        <div className="container mx-auto px-4 z-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                {content[language].hero.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {content[language].hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <AppleButton variant="green" className="px-8 py-3">
                  {content[language].hero.explore}
                </AppleButton>
                <AppleButton variant="secondary" className="px-8 py-3">
                  {content[language].hero.learnMore}
                </AppleButton>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
                alt="Inside Container Farm" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="bg-white dark:bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{content[language].about.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {content[language].about.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Sustainable Farming</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our container farms use 95% less water than traditional farming methods while maximizing crop yield.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <SproutIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Smart Technology</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced sensors monitor every aspect of the growing environment for optimal plant health.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DropletIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Water Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Precision irrigation and water recycling systems conserve this precious resource.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Indonesia Impact section */}
      <section id="indonesia" className="bg-gradient-to-br from-primary/5 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Impact in Indonesia</h2>
            <p className="text-gray-600 dark:text-gray-400">
              AKAR's container farming technology is uniquely positioned to address Indonesia's agricultural challenges 
              and support sustainable development across the archipelago.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-primary">Addressing Indonesia's Unique Challenges</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 dark:text-white">Archipelago Distribution</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our container farms can be deployed across Indonesia's 17,000+ islands, bringing fresh produce to remote communities.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <SproutIcon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 dark:text-white">Tropical Climate Adaptation</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our systems are specifically calibrated for Indonesia's tropical climate, ensuring optimal growing conditions year-round.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <LineChart className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 dark:text-white">Urban Food Security</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      As Indonesia's cities grow, our urban farming solutions help ensure food security and reduce transportation emissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">70%</h4>
                <p className="text-gray-600 dark:text-gray-400">Reduction in water usage compared to traditional farming in Indonesia</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">5x</h4>
                <p className="text-gray-600 dark:text-gray-400">More produce per square meter than conventional Indonesian farms</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
                <p className="text-gray-600 dark:text-gray-400">Monitoring with Indonesian-developed IoT technology</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">12+</h4>
                <p className="text-gray-600 dark:text-gray-400">Indonesian provinces where our containers are currently deployed</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">Our Growing Impact Across Indonesia</h3>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
              {/* Replace the static map with our interactive component */}
              <IndonesiaMap />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">Jakarta Hub</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our flagship urban farming center serving Indonesia's capital</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">Bali Eco-Center</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sustainable tourism meets agriculture innovation</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">Sulawesi Outreach</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bringing technology to traditional farming communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solutions section */}
      <section id="solutions" className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              From urban farming containers to comprehensive monitoring systems, AKAR offers end-to-end solutions for modern agriculture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">Container Farms</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Fully equipped, turnkey container farming solutions that can be deployed anywhere. Each container is a complete ecosystem optimized for plant growth.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Modular design for easy scaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Comprehensive environmental controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remote monitoring capabilities</span>
                </li>
              </ul>
              <Button variant="apple-outline" className="rounded-full mt-4">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">Monitoring Dashboard</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our advanced dashboard gives you complete visibility into your farm's operations, allowing you to monitor and control all aspects remotely.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Real-time environmental monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Predictive maintenance alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Yield and performance analytics</span>
                </li>
              </ul>
              <Button variant="apple-outline" className="rounded-full mt-4">
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology section */}
      <section id="technology" className="bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Technology</h2>
            <p className="text-gray-600 dark:text-gray-400">
              AKAR combines cutting-edge technology with sustainable farming practices to create the most efficient growing systems.
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden mb-16 h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            <img 
              src="/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png" 
              alt="AKAR Real-time Monitoring" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-lg">
              <h3 className="text-3xl font-bold text-white mb-4">Data-Driven Farming</h3>
              <p className="text-white/90 mb-6">
                Our proprietary sensor network continuously monitors all critical growing parameters, ensuring optimal conditions and maximum crop yields.
              </p>
              <Button variant="apple" className="rounded-full">
                Explore Technology
              </Button>
            </div>
          </div>
          
          {/* Technology feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">AI-Powered Growth Optimization</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Machine learning algorithms analyze growing conditions to provide recommendations for improved yields.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DropletIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Automated Irrigation Systems</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Precise water delivery systems ensure each plant receives exactly what it needs, when it needs it.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Advanced Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive data collection and analysis for continuous improvement of farming operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tokenization section */}
      <section id="tokenization" className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {language === 'en' ? 'Tokenization' : 'Tokenisasi'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? 'Blockchain technology brings unprecedented transparency, security, and liquidity to agricultural investments. Each token represents real ownership in productive farm assets.'
                : 'Teknologi blockchain membawa transparansi, keamanan, dan likuiditas yang belum pernah ada sebelumnya ke investasi pertanian. Setiap token mewakili kepemilikan nyata dalam aset pertanian produktif.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{content[language].tokenization.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {content[language].tokenization.description}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {language === 'en' ? 'Transparent Investment' : 'Investasi Transparan'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'en' 
                        ? 'Full visibility into farm operations and performance' 
                        : 'Visibilitas penuh ke operasi dan kinerja pertanian'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {language === 'en' ? 'Fractional Ownership' : 'Kepemilikan Fraksional'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'en' 
                        ? 'Start with any investment size that fits your
