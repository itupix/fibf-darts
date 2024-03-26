import { useEffect, useState } from "react"
import { GameContextType, GameType } from "./contexts/game"
import { v4 as uuidv4 } from 'uuid';

const getGameFromLocalStorage = () => {
  const data = localStorage.getItem('game')
  if (data) return JSON.parse(data) as GameType
  return null
}

export const useGame: () => GameContextType = () => {
  const [game, setGame] = useState<GameType | null>(getGameFromLocalStorage())

  const initGame = (mode: string) => {
    setGame({
      ...game,
      uuid: uuidv4(),
      history: [],
      currentPlayerUuid: game?.playersUuid[0],
      mode,
    } as GameType)
  }

  useEffect(() => {
    localStorage.setItem('game', JSON.stringify(game))
  }, [game])

  return {
    game,
    setGame,
    initGame
  }
}