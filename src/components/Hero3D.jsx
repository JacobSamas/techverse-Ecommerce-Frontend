"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Function to load a 3D model with bigger scaling
function ProductModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[10, 10, 10]} position={[0, -1, 0]} />;
}

export default function Hero3D() {
  const models = ["/models/model1.glb", "/models/model2.glb"];
  const [currentModel, setCurrentModel] = useState(0); // Track active model

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <Canvas className="w-full h-[60vh] md:h-[85vh]">
        {/* Controls */}
        <OrbitControls enableZoom={false} autoRotate />

        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 1]} intensity={1.5} />

        {/* Enlarged 3D Model */}
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
