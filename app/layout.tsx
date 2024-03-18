import type { Metadata } from "next";
import './global.scss'
import { Content } from "./components/Content";

export const metadata: Metadata = {
  title: "Darts",
  description: "Darts app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>
        <Content>{children}</Content>
      </body>
    </html>
  );
}
