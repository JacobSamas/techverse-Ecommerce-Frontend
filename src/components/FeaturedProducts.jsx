"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/products";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Icons for navigation
import QuickViewModal from "./QuickViewModal"; // Import Quick View Modal

const colorClasses = {
  red: "text-red-500 border-red-500 hover:text-white",
  green: "text-green-500 border-green-500 hover:text-white",
  blue: "text-blue-500 border-blue-500 hover:text-white",
  yellow: "text-yellow-500 border-yellow-500 hover:text-white",
  purple: "text-purple-500 border-purple-500 hover:text-white",
  pink: "text-pink-500 border-pink-500 hover:text-white",
};

export default function FeaturedProducts() {
  const { themeColor } = useTheme();
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll function for arrows
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-16 bg-black text-center relative">
      <h2 className={`text-4xl font-bold ${colorClasses[themeColor]}`}>
        Featured Products
      </h2>
      <p className="text-gray-400 mt-2 mb-8">
        Discover our best-selling tech gadgets.
      </p>

      {/* Product Scrollable List */}
      <div className="relative w-full px-6">
        {/* Left Arrow (Hidden on Mobile) */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-md text-white z-10 hover:bg-gray-700 hidden md:flex"
          onClick={() => scroll("left")}
        >
          <FiChevronLeft size={24} />
        </button>

        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar space-x-6 px-2 md:px-8 scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 p-5 rounded-lg shadow-lg min-w-[250px] sm:min-w-[300px] flex flex-col items-center"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md cursor-pointer"
                onClick={() => setSelectedProduct(product)} // Open Quick View on click
              />

              {/* Product Details */}
              <h3 className="text-lg font-semibold mt-3 text-white">
                {product.name}
              </h3>
              <p className="text-gray-400">{product.category}</p>
              <p className={`text-xl font-bold mt-2 ${colorClasses[themeColor]}`}>
                {product.price}
              </p>
              <p className="text-gray-300 text-sm">⭐ {product.rating} | {product.stock}</p>

              {/* Buttons */}
              <div className="flex justify-between mt-4 w-full">
                <button
                  className={`px-4 py-2 border-2 rounded-md transition-colors duration-300 ${colorClasses[themeColor]}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  Quick View
                </button>
                <button
                  className={`px-4 py-2 border-2 rounded-md transition-colors duration-300 ${colorClasses[themeColor]}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Arrow (Hidden on Mobile) */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-md text-white z-10 hover:bg-gray-700 hidden md:flex"
          onClick={() => scroll("right")}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
