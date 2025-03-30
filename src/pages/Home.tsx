
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, SproutIcon, DropletIcon, LineChart, Sparkles, ShoppingCart, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";
import { AppleButton } from "@/components/ui/apple-button";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IndonesiaMap } from "@/components/home/IndonesiaMap";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header/Navigation */}
      <header className="w-full bg-white border-b border-gray-200">
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
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                About
              </a>
              <a href="#solutions" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Solutions
              </a>
              <a href="#technology" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Technology
              </a>
              <a href="#tokenization" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Tokenization
              </a>
              <a href="#indonesia" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Indonesia Impact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="apple" size="sm" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative w-full min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white to-accent/20"></div>
        <div className="container mx-auto px-4 z-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Revolutionizing Urban Farming for a Sustainable Indonesia
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                AKAR delivers cutting-edge farming solutions with smart container technology, 
                specially designed for Indonesia's tropical climate and urban challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <AppleButton variant="green" className="px-8 py-3">
                  Explore Solutions
                </AppleButton>
                <AppleButton variant="secondary" className="px-8 py-3">
                  Learn More
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
      <section id="about" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">About AKAR</h2>
            <p className="text-gray-600">
              AKAR is pioneering the future of sustainable urban farming with smart container technology, 
              bridging the gap between advanced agriculture and modern technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Farming</h3>
              <p className="text-gray-600">
                Our container farms use 95% less water than traditional farming methods while maximizing crop yield.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <SproutIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Technology</h3>
              <p className="text-gray-600">
                Advanced sensors monitor every aspect of the growing environment for optimal plant health.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DropletIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Water Efficiency</h3>
              <p className="text-gray-600">
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
            <h2 className="text-3xl font-bold mb-4">Impact in Indonesia</h2>
            <p className="text-gray-600">
              AKAR's container farming technology is uniquely positioned to address Indonesia's agricultural challenges 
              and support sustainable development across the archipelago.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Addressing Indonesia's Unique Challenges</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Archipelago Distribution</h4>
                    <p className="text-gray-600">
                      Our container farms can be deployed across Indonesia's 17,000+ islands, bringing fresh produce to remote communities.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <SproutIcon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Tropical Climate Adaptation</h4>
                    <p className="text-gray-600">
                      Our systems are specifically calibrated for Indonesia's tropical climate, ensuring optimal growing conditions year-round.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <LineChart className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Urban Food Security</h4>
                    <p className="text-gray-600">
                      As Indonesia's cities grow, our urban farming solutions help ensure food security and reduce transportation emissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">70%</h4>
                <p className="text-gray-600">Reduction in water usage compared to traditional farming in Indonesia</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">5x</h4>
                <p className="text-gray-600">More produce per square meter than conventional Indonesian farms</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
                <p className="text-gray-600">Monitoring with Indonesian-developed IoT technology</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="text-4xl font-bold text-primary mb-2">12+</h4>
                <p className="text-gray-600">Indonesian provinces where our containers are currently deployed</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6">Our Growing Impact Across Indonesia</h3>
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
              {/* Replace the static map with our interactive component */}
              <IndonesiaMap />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">Jakarta Hub</h4>
                  <p className="text-sm text-gray-600">Our flagship urban farming center serving Indonesia's capital</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Bali Eco-Center</h4>
                  <p className="text-sm text-gray-600">Sustainable tourism meets agriculture innovation</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Sulawesi Outreach</h4>
                  <p className="text-sm text-gray-600">Bringing technology to traditional farming communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solutions section */}
      <section id="solutions" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Solutions</h2>
            <p className="text-gray-600">
              From urban farming containers to comprehensive monitoring systems, AKAR offers end-to-end solutions for modern agriculture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Container Farms</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Fully equipped, turnkey container farming solutions that can be deployed anywhere. Each container is a complete ecosystem optimized for plant growth.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Modular design for easy scaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Comprehensive environmental controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Remote monitoring capabilities</span>
                </li>
              </ul>
              <Button variant="apple-outline" className="rounded-full mt-4">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Monitoring Dashboard</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Our advanced dashboard gives you complete visibility into your farm's operations, allowing you to monitor and control all aspects remotely.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Real-time environmental monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Predictive maintenance alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Yield and performance analytics</span>
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
      <section id="technology" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
            <p className="text-gray-600">
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
            <div className="p-6 border border-gray-100 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Growth Optimization</h3>
              <p className="text-gray-600">
                Machine learning algorithms analyze growing conditions to provide recommendations for improved yields.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DropletIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Irrigation Systems</h3>
              <p className="text-gray-600">
                Precise water delivery systems ensure each plant receives exactly what it needs, when it needs it.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Comprehensive data collection and analysis for continuous improvement of farming operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tokenization section */}
      <section id="tokenization" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Tokenization</h2>
            <p className="text-gray-600">
              AKAR is pioneering agricultural investment through blockchain technology, allowing investors to participate in the future of farming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Invest in Sustainable Agriculture</h3>
              <p className="text-gray-600 mb-6">
                Through our innovative tokenization model, you can own a stake in container farms and participate in the growing sustainable agriculture market.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Transparent Investment</h4>
                    <p className="text-sm text-gray-600">Full visibility into farm operations and performance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Fractional Ownership</h4>
                    <p className="text-sm text-gray-600">Start with any investment size that fits your portfolio</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Blockchain Security</h4>
                    <p className="text-sm text-gray-600">Built on Polygon PoC for reliable, secure transactions</p>
                  </div>
                </li>
              </ul>
              <Link to="/tokenization">
                <Button variant="apple" className="rounded-full">
                  Learn About Tokenization
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Current Offerings</h3>
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">Polygon PoC</span>
              </div>
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Container Farm A</span>
                    <span className="text-primary">70% Funded</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>20 MATIC per token</span>
                    <span>300/500 tokens sold</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Container Farm B</span>
                    <span className="text-primary">45% Funded</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>25 MATIC per token</span>
                    <span>225/500 tokens sold</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Container Farm C</span>
                    <span className="text-primary">90% Funded</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>18 MATIC per token</span>
                    <span>450/500 tokens sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform the future of farming?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join AKAR in our mission to make sustainable agriculture accessible, efficient, and profitable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button variant="apple" size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                Get Started
              </Button>
            </Link>
            {/* Fixed the contrast issue with the Contact Us button */}
            <Button variant="outline" size="lg" className="rounded-full text-white border-white hover:bg-white/10 bg-primary/50">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer - updated to white */}
      <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
                alt="AKAR Logo" 
                className="h-10 mb-4"
              />
              <p className="text-gray-600 text-sm mb-4">
                Revolutionizing sustainable farming through smart container technology for a greener Indonesia.
              </p>
              <p className="text-gray-600 text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Pluit Village Mall 2nd Floor, North Jakarta, Indonesia</span>
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Container Farms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Monitoring Systems</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Crop Management</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Consultancy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-600 hover:text-primary transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">News</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Connect</h4>
              <div className="flex gap-4 mb-4">
                <a href="https://www.instagram.com/akarfarm" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/akarfarm" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.x.com/akarfarm" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-600">
                Subscribe to our newsletter for the latest updates on sustainable farming innovations.
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AKAR. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
