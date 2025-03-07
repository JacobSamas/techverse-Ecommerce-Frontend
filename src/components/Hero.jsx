"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";
import Hero3D from "./Hero3D"; // Import 3D component

const colorClasses = {
  red: "text-red-500 border-red-500 hover:text-white",
  green: "text-green-500 border-green-500 hover:text-white",
  blue: "text-blue-500 border-blue-500 hover:text-white",
  yellow: "text-yellow-500 border-yellow-500 hover:text-white",
  purple: "text-purple-500 border-purple-500 hover:text-white",
  pink: "text-pink-500 border-pink-500 hover:text-white",
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

export default function Hero() {
  const { themeColor } = useTheme();
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, y: 50, duration: 1.2, ease: "power3.out" });
  }, []);

  return (
    <section ref={heroRef} className="w-full h-[80vh] flex flex-col md:flex-row items-center justify-center text-center px-4 md:px-10 relative">
      {/* Left Side: Text */}
      <div className="md:w-1/2">
        <h1 className={`text-4xl md:text-6xl font-bold ${colorClasses[themeColor]}`}>
          Discover the Future of Gadgets
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl">
          Upgrade your tech game with the latest and most innovative gadgets.
        </p>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`mt-6 px-6 py-3 border-2 rounded-lg text-lg font-semibold transition-all ${colorClasses[themeColor]}`}
        >
          Shop Now
        </motion.button>
      </div>

      {/* Right Side: 3D Model */}
      <div className="md:w-1/2 h-[50vh] md:h-[80vh]">
        <Hero3D />
      </div>
    </section>
  );
}
