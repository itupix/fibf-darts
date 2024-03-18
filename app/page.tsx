"use client";
import Link from "next/link";
import styles from './app.module.scss'

export default function Home() {
  return (
    <>
      <Link href="/t20" className={styles.game}>
        <h2>Triple 20</h2>
        <p>Le but est de taper trois fois le triple 20 en trois coups.</p>
      </Link>
      <Link href="/practice" className={styles.game}>
        <h2>Entrainement</h2>
        <p>Enchaînez les coups sans adversaire ni règle.</p>
      </Link>
    </>
  );
}
