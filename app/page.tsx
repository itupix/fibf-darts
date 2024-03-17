"use client";
import Link from "next/link";
import { useGranboard } from "./useGranboard";
import styles from './app.module.scss'

export default function Home() {
  const { segment } = useGranboard()

  return (
    <Link href="/t20" className={styles.game}>
      <h2>Triple 20</h2>
      <p>Le but est de taper trois fois le triple 20 en trois coups.</p>
    </Link>
  );
}
