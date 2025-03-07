import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <ThemeProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
