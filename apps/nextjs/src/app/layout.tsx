import { Inter } from "next/font/google";
import clsx from "clsx";

import "src/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Legion Health | Texas psychiatry covered by insurance - get treatment for anxiety today",
  description:
    "Legion Health is a group of world-class psychiatric providers in Texas who take your insurance and provide quality treatment for anxiety, depression, and other disorders",
  category: "Travel",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "Legion Health",
    "Legion",
    "Health",
    "Legion Health Texas",
    "Legion Health Texas psychiatry",
    "Legion Health Texas psychiatry covered by insurance",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>
          Legion Health | Texas psychiatry covered by insurance - get treatment
          for anxiety today
        </title>
      </head>
      <body className={clsx(inter.variable, "font-sans")}>{children}</body>
    </html>
  );
}
