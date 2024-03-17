import type { Metadata } from "next";
import { Header } from "./components/Header";
import styles from './app.module.scss'
import './global.scss'
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
        <Header />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}
