import { useEffect, useRef } from "react";
import * as THREE from "three";

interface VpnShield3DProps {
  theme: "dark" | "light";
}

export default function VpnShield3D({ theme }: VpnShield3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const ringsRef = useRef<THREE.LineSegments[]>([]);

  // Mouse tracking state for tilt
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update colors based on theme
  useEffect(() => {
    if (!sceneRef.current) return;

    const isDark = theme === "dark";
    const primaryColor = new THREE.Color(isDark ? 0x10b981 : 0x059669); // Emerald Green
    const secondaryColor = new THREE.Color(isDark ? 0x06b6d4 : 0x0891b2); // Cyan

    // Update particle material color
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.color = primaryColor;
    }

    // Update ring materials
    ringsRef.current.forEach((ring, idx) => {
      const material = ring.material as THREE.LineBasicMaterial;
      material.color = idx % 2 === 0 ? primaryColor : secondaryColor;
      material.opacity = isDark ? 0.35 : 0.55;
    });
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Create Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 6.2;
    cameraRef.current = camera;

    // 3. Create WebGLRenderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear any existing children before appending (failsafe against duplicate mounts in StrictMode)
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Create Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    const isDark = theme === "dark";
    const primaryHex = isDark ? 0x10b981 : 0x059669;
    const secondaryHex = isDark ? 0x06b6d4 : 0x0891b2;

    // 5. Create inner particle sphere (holographic core)
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.4 + Math.random() * 0.14; // radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Glow dot texture using Canvas
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      color: primaryHex,
      size: 0.085,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createCircleTexture(),
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    mainGroup.add(particles);
    particlesRef.current = particles;

    // 6. Create outer orbit rings
    const ringGeometries = [
      new THREE.RingGeometry(1.85, 1.87, 64),
      new THREE.RingGeometry(2.15, 2.17, 64),
      new THREE.RingGeometry(2.45, 2.47, 64)
    ];

    const rings: THREE.LineSegments[] = [];
    ringGeometries.forEach((geom, idx) => {
      const material = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? primaryHex : secondaryHex,
        transparent: true,
        opacity: isDark ? 0.35 : 0.55,
        blending: THREE.AdditiveBlending,
      });
      
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(edges, material);
      
      // Orient rings differently
      if (idx === 0) line.rotation.x = Math.PI / 3;
      if (idx === 1) line.rotation.y = Math.PI / 4;
      if (idx === 2) {
        line.rotation.x = Math.PI / 6;
        line.rotation.z = Math.PI / 3;
      }

      mainGroup.add(line);
      rings.push(line);
    });
    ringsRef.current = rings;

    // 7. Ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 8. Event Listeners for Interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.current.targetX = x * 0.35;
      mouse.current.targetY = y * 0.35;
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Handle window resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Idle rotations
      mainGroup.rotation.y = elapsedTime * 0.15;
      mainGroup.rotation.x = elapsedTime * 0.08;

      // Animate rings
      rings.forEach((ring, idx) => {
        if (idx === 0) ring.rotation.z = elapsedTime * 0.2;
        if (idx === 1) ring.rotation.y = -elapsedTime * 0.15;
        if (idx === 2) ring.rotation.x = elapsedTime * 0.3;
      });

      // Particle breathing motion
      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;

        const origX = originalPositions[xIdx];
        const origY = originalPositions[yIdx];
        const origZ = originalPositions[zIdx];

        const wave = Math.sin(elapsedTime * 1.5 + Math.sqrt(origX * origX + origY * origY + origZ * origZ) * 3) * 0.035;

        posArray[xIdx] = origX * (1 + wave);
        posArray[yIdx] = origY * (1 + wave);
        posArray[zIdx] = origZ * (1 + wave);
      }
      positionsAttr.needsUpdate = true;

      // Smooth hover interpolation
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      mainGroup.rotation.x += mouse.current.y * 0.4;
      mainGroup.rotation.y += mouse.current.x * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      particleMaterial.dispose();
      ringGeometries.forEach(geom => geom.dispose());
      rings.forEach(ring => {
        const material = ring.material as THREE.Material;
        material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center z-10"
    />
  );
}
