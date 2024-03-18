"use client";

import { useContext, useEffect, useState } from "react";
import styles from './t20.module.scss'
import { GranboardContext } from "../contexts/granboard";

const t20 = () => {
  const { segment, simulateSuccessHit, simulateFailHit } = useContext(GranboardContext)
  const [gameStatus, setGameStatus] = useState("stopped")
  const [attempts, setAttempts] = useState<string[]>([])

  const cheat = () => {
    simulateSuccessHit()
  }
  const fail = () => {
    simulateFailHit()
  }

  const startGame = () => {
    setGameStatus('started')
    setAttempts([])
  }

  useEffect(() => {
    if (segment?.Section === 20 && segment.Type === 3) {
      setAttempts([...attempts, 'success'])
    } else {
      setAttempts([...attempts, 'failure'])
    }
  }, [segment])

  useEffect(() => {
    if (attempts.length === 3) {
      const hasWon = !attempts.find((attempt) => attempt === "failure")
      setGameStatus(hasWon ? 'win' : 'lose')
    }
  }, [attempts])

  return (<div className={styles.container}>
    <button onClick={cheat}>Cheat</button>
    <button onClick={fail}>fail</button>
    {{
      win: <><h1>Gagné !</h1><button onClick={startGame}>Recommencer</button></>,
      lose: <><h1>Perdu !</h1><button onClick={startGame}>Recommencer</button></>,
      stopped: <button onClick={startGame}>Démarrer</button>,
      started: <div className={styles.attempts}>
        <span className={styles[attempts[0]]}><i className='bx bxs-circle'></i></span>
        <span className={styles[attempts[1]]}><i className='bx bxs-circle'></i></span>
        <span className={styles[attempts[2]]}><i className='bx bxs-circle'></i></span>
      </div>
    }[gameStatus]}
    {segment && (
      <div>
        {segment.ID}
      </div>
    )}
  </div>)
}

export default t20