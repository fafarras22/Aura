
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const ContainerVisualization: React.FC = () => {
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

  return <div ref={containerRef} className="h-[400px]" />;
};
