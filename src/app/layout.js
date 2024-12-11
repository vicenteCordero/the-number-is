import { JetBrains_Mono } from "next/font/google" 
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  weight: ["300", "800"],
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${jetBrainsMono.className} antialiased bg-slate-400`}
      >
        {children}
      </body>
    </html>
  );
}
