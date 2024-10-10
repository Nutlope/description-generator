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
        <footer className="mt-16 w-full items-center px-4 pb-10 text-center text-gray-500 md:mt-4 md:flex md:justify-between md:pb-5 md:text-xs lg:text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://www.dub.sh/together-ai"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-blue-500"
            >
              Together.ai
            </a>{" "}
            &{" "}
            <a
              href="https://www.dub.sh/together-ai"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-blue-500"
            >
              Llama 3.2
            </a>
          </p>

          <div className="mt-8 flex items-center justify-center md:mt-0 md:justify-between md:gap-6">
            <p className="hidden whitespace-nowrap md:block">
              100% free and{" "}
              <a
                href="https://github.com/Nutlope/description-generator"
                target="_blank"
                className="underline underline-offset-4 transition hover:text-blue-500"
              >
                open source
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
