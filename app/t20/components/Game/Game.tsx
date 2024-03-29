"use client";
import { useContext, useEffect, type FC } from "react";
import { GameContext, GameType, Shot } from "../../../contexts/game";
import { GranboardContext } from "../../../contexts/granboard";
import { PlayersContext } from "../../../contexts/players";
import styles from './Game.module.scss';
import { useCurrentLeg } from "@/app/useCurrentLeg";

interface Props {
  game: GameType
}

const getNextPlayer = (game: GameType) => {
  const index = game.playersUuid.indexOf(game.currentPlayerUuid)
  if (index === game.playersUuid.length - 1) {
    return game.playersUuid[0]
  }
  return game.playersUuid[index + 1]
}

export const Game: FC<Props> = ({ game }) => {
  const legMax = 3
  const { setGame } = useContext(GameContext)
  const { simulateSuccessHit, simulateFailHit } = useContext(GranboardContext)
  const { players } = useContext(PlayersContext)
  const { currentLeg, setCurrentLeg } = useCurrentLeg(game, legMax)

  // Switch player and check if winner
  useEffect(() => {
    if (currentLeg[game.currentPlayerUuid].filter((shot) => !!shot).length === legMax) {
      let params: Record<string, string> = { currentPlayerUuid: getNextPlayer(game) }

      if (currentLeg[game.currentPlayerUuid].every((shot) => shot?.segment.ID === 77)) {
        params = { winnerUuid: game.currentPlayerUuid }
      }

      setGame({
        ...game,
        ...params
      } as GameType)
    }
  }, [currentLeg])

  // Winner screen
  if (game.winnerUuid) {
    return (
      <div className={styles.container}>
        <h1>{players.find((player) => game.currentPlayerUuid === player.uuid)?.name} a gagné !</h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {game.playersUuid.map((uuid) => (
        <div key={uuid} className={`${styles.player} ${game.currentPlayerUuid === uuid ? styles.current : ''}`}>
          <h1 className={styles.name}>{players.find((player) => uuid === player.uuid)?.name}</h1>
          <ul className={styles.list}>
            {currentLeg[uuid].map((shot, index) => (
              <li key={index} className={`${styles.leg} ${!shot ? '' : shot.segment.ID === 77 ? styles.success : styles.fail}`}>
                <i className='bx bxs-circle'></i>
              </li>
            ))}
          </ul>
          {/* <ul>
            {game.history.filter((shot) => shot.playerUuid === uuid).map((shot) => (
              <li>{shot.segment}</li>
            ))}
          </ul> */}
        </div>
      ))}
      <div className={styles.cheatMode}>
        <button onClick={simulateSuccessHit}>Cheat</button>
        <button onClick={simulateFailHit}>fail</button>
      </div>
    </div>
  )
}