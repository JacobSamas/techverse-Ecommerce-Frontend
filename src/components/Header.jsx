"use client";
import { useState, useEffect, useRef } from "react";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiDroplet } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext"; 

const colorClasses = {
  red: "text-red-500 border-red-500 hover:text-white",
  green: "text-green-500 border-green-500 hover:text-white",
  blue: "text-blue-500 border-blue-500 hover:text-white",
  yellow: "text-yellow-500 border-yellow-500 hover:text-white",
  purple: "text-purple-500 border-purple-500 hover:text-white",
  pink: "text-pink-500 border-pink-500 hover:text-white",
};

export default function Header() {
  const { themeColor, setThemeColor } = useTheme(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(3);
  const colorPickerRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleColorPicker = () => setColorPickerOpen(!colorPickerOpen);
  const colors = Object.keys(colorClasses);

  const signIn = () => {
    setUser({ name: "John Doe", avatar: "https://via.placeholder.com/40" });
  };

  const signOut = () => setUser(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setColorPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full p-4 border-b border-gray-600 bg-black relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className={`text-2xl font-bold ${colorClasses[themeColor]}`}>
          TechVerse
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <a href="/" className={`transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}>
            Home
          </a>
          <a href="/products" className={`transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}>
            Products
          </a>
          <a
            href="/cart"
            className={`transition-colors duration-300 flex items-center ${colorClasses[themeColor]} cursor-pointer`}
          >
            Cart <FiShoppingCart className="ml-1" />
            {cartCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </nav>

        {/* Color Picker Icon */}
        <div className="relative" ref={colorPickerRef}>
          <button
            className={`p-2 border-2 rounded-lg flex items-center gap-1 ${colorClasses[themeColor]} cursor-pointer`}
            onClick={toggleColorPicker}
          >
            <FiDroplet className={colorClasses[themeColor]} />
          </button>

          {/* Horizontal Color Picker */}
          {colorPickerOpen && (
            <div className="absolute right-0 top-12 bg-gray-900 p-2 rounded-md shadow-md flex gap-2 z-50">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${colorClasses[color]} cursor-pointer`}
                  onClick={() => {
                    setThemeColor(color);
                    setColorPickerOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* User Authentication */}
        {user ? (
          <div className="flex items-center gap-3 ml-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-500 cursor-pointer"
            />
            <button
              onClick={signOut}
              className={`px-3 py-1 border rounded-md text-sm transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={signIn}
            className={`ml-4 px-3 py-1 border rounded-md text-sm transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}
          >
            Sign In
          </button>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-4 bg-black p-4 rounded-md">
          <a
            href="/"
            className={`block p-2 transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="/products"
            className={`block p-2 transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </a>
          <a
            href="/cart"
            className={`block p-2 flex items-center transition-colors duration-300 ${colorClasses[themeColor]} cursor-pointer`}
            onClick={() => setMenuOpen(false)}
          >
            Cart <FiShoppingCart className="ml-1" />
            {cartCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </nav>
      )}
    </header>
  );
}
