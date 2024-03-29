"use client"
import { useContext, useEffect, useState } from "react"
import { GranboardContext } from "../contexts/granboard"
import { Segment } from "@/services/boardinfo"
import styles from './Practice.module.scss'

const Practice = () => {
  const { segment, simulateSuccessHit, simulateFailHit } = useContext(GranboardContext)
  const [history, setHistory] = useState<Segment[]>([])

  useEffect(() => {
    if (segment) {
      setHistory([...history, segment])
    }
  }, [segment])

  const historyToDisplay = [...history].reverse()

  return (
    <>
      <h1>Practice</h1>
      <button onClick={simulateSuccessHit}>T20</button>
      <button onClick={simulateFailHit}>Fail</button>
      <table className={styles.table}>
        <tbody>
          {historyToDisplay.map((segment: Segment, index) => (
            <tr key={index} >
              <td>{segment.LongName}</td>
              <td>{segment.Value} pts</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Practice