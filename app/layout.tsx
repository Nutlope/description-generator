import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PlausibleProvider from "next-plausible";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Product Description Generator",
  description: "Generate a description for your product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="product-descriptions.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="mt-20 flex w-full flex-col justify-between gap-4 px-4 text-center text-sm text-gray-500 md:flex-row md:text-left">
          <p>
            Powered by{" "}
            <a
              href="https://togetherai.link"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-blue-500"
            >
              Together.ai
            </a>{" "}
            &{" "}
            <a
              href="https://togetherai.link"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-blue-500"
            >
              Llama 3.2
            </a>
          </p>
          <p>
            100% free and{" "}
            <a
              href="https://github.com/Nutlope/description-generator"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-blue-500"
            >
              open source
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
