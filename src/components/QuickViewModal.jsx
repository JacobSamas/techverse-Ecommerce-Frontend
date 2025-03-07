"use client";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function QuickViewModal({ product, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm text-center relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <FiX size={24} />
        </button>

        {/* Product Image */}
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />

        {/* Product Details */}
        <h3 className="text-xl font-semibold mt-3 text-white">{product.name}</h3>
        <p className="text-gray-400">{product.category}</p>
        <p className="text-xl font-bold mt-2 text-red-500">{product.price}</p>
        <p className="text-gray-300 text-sm">⭐ {product.rating} | {product.stock}</p>

        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md">
            Add to Cart
          </button>
          <button className="px-4 py-2 border-2 border-gray-400 text-gray-400 rounded-md" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
