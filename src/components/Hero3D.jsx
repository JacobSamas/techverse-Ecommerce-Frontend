"use client";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Responsive scaling based on screen size
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);
  return matches;
}

// Function to load a 3D model with dynamic scaling
function ProductModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <primitive
      object={scene}
      scale={isMobile ? [6, 6, 6] : [10, 10, 10]} // Smaller scale for mobile
      position={[0, -1, 0]}
    />
  );
}

export default function Hero3D() {
  const models = ["/models/model1.glb", "/models/model2.glb"];
  const [currentModel, setCurrentModel] = useState(0); // Track active model

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden">
      <Canvas className="w-full h-[50vh] md:h-[85vh]">
        {/* Controls */}
        <OrbitControls enableZoom={false} autoRotate />

        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 1]} intensity={1.5} />

        {/* Responsive 3D Model */}
        <ProductModel modelPath={models[currentModel]} />
      </Canvas>

      {/* Dots for Model Switching */}
      <div className="absolute bottom-4 flex gap-3">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentModel(index)}
            className={`w-4 h-4 rounded-full border-2 transition-all ${
              currentModel === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
