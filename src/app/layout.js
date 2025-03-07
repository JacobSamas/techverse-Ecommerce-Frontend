"use client";

import "./globals.css";
import { useState } from "react";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  const [themeColor, setThemeColor] = useState("red"); // Default color is Red

  return (
    <html lang="en">
      <body className="bg-black">
        <Header themeColor={themeColor} setThemeColor={setThemeColor} />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}



