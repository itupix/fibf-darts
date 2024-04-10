"use client";
import Link from "next/link";
import styles from './app.module.scss'
import { useContext, useEffect } from "react";
import { GameContext } from "./contexts/game";

export default function Home() {
  const { setGame } = useContext(GameContext)

  useEffect(() => {
    if ("wakeLock" in navigator) {
      try {
        navigator.wakeLock.request("screen");
      } catch (err) {
        console.error('Wake lock inactive')
      }
    }

    setGame(null)
  }, [])

  return (
    <div className={styles.container}>
      <Link href="/cricket" className={styles.game}>
        <h2>Cricket</h2>
        <p>Marquez et fermez certaines cases en visant stratégiquement.</p>
      </Link>
      {/* <Link href="/01" className={styles.game}>
        <h2>01</h2>
        <p>Le jeux le plus populaire avec ses variantes: 301, 501 etc.</p>
      </Link> */}
      <Link href="/practice" className={styles.game}>
        <h2>Entrainement</h2>
        <p>Enchaînez les coups sans adversaire ni règle.</p>
      </Link>
    </div>
  );
}
