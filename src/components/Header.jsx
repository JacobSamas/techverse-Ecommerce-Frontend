"use client";
import { useState } from "react";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiDroplet } from "react-icons/fi";

// Define Tailwind color classes
const colorClasses = {
  red: "text-red-500 border-red-500",
  green: "text-green-500 border-green-500",
  blue: "text-blue-500 border-blue-500",
  yellow: "text-yellow-500 border-yellow-500",
  purple: "text-purple-500 border-purple-500",
  pink: "text-pink-500 border-pink-500",
};

export default function Header({ themeColor, setThemeColor }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(3);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleColorPicker = () => setColorPickerOpen(!colorPickerOpen);
  const colors = Object.keys(colorClasses);

  const signIn = () => {
    setUser({
      name: "John Doe",
      avatar: "https://via.placeholder.com/40",
    });
  };

  const signOut = () => setUser(null);

  return (
    <header className="w-full p-4 border-b border-gray-600 bg-black relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className={`text-2xl font-bold ${colorClasses[themeColor]}`}>
          TechVerse
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <a href="/" className={`hover:text-opacity-80 ${colorClasses[themeColor]}`}>
            Home
          </a>
          <a href="/products" className={`hover:text-opacity-80 ${colorClasses[themeColor]}`}>
            Products
          </a>
          <a href="/cart" className={`hover:text-opacity-80 flex items-center ${colorClasses[themeColor]}`}>
            Cart <FiShoppingCart className="ml-1" />
            {cartCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </nav>

        {/* Color Picker Icon */}
        <div className="relative">
          <button
            className={`p-2 border-2 rounded-lg flex items-center gap-1 ${colorClasses[themeColor]}`}
            onClick={toggleColorPicker}
          >
            <FiDroplet className={colorClasses[themeColor]} />
          </button>

          {/* Horizontal Color Picker */}
          {colorPickerOpen && (
            <div className="absolute right-0 top-12 bg-gray-900 p-2 rounded-md shadow-md flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${colorClasses[color]}`}
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
              className="w-8 h-8 rounded-full border border-gray-500"
            />
            <button
              onClick={signOut}
              className={`px-3 py-1 border rounded-md text-sm ${colorClasses[themeColor]}`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={signIn}
            className={`ml-4 px-3 py-1 border rounded-md text-sm ${colorClasses[themeColor]}`}
          >
            Sign In
          </button>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-4">
          <a href="/" className={`block p-2 ${colorClasses[themeColor]}`}>
            Home
          </a>
          <a href="/products" className={`block p-2 ${colorClasses[themeColor]}`}>
            Products
          </a>
          <a href="/cart" className={`block p-2 flex items-center ${colorClasses[themeColor]}`}>
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
