import { useEffect, useState } from "react"
import { GameType, Shot } from "./contexts/game"

const initCurrentLeg = (game: GameType, max: number) => game.playersUuid.reduce((acc: Record<string, Shot[]>, curr: string) => {
  acc[curr] = Array(max).fill(null)
  return acc
}, {})

export const useCurrentLeg = (game: GameType, legMax: number = 3) => {
  const [currentLeg, setCurrentLeg] = useState<Record<string, (Shot | null)[]>>(initCurrentLeg(game, legMax))

  // Create player history for a leg
  useEffect(() => {
    const playerShots = currentLeg[game.currentPlayerUuid].filter((shot) => !!shot)
    let leg = [...playerShots, ...game.history.slice(-1)]

    if (playerShots.length === legMax) {
      leg = [...game.history.slice(-1)]
    }

    for (let index = leg.length; index < legMax; index++) {
      leg.push(null)
    }

    setCurrentLeg({
      ...currentLeg,
      [game.currentPlayerUuid]: leg
    })
  }, [game.history])

  // Empty array when switching player
  useEffect(() => {
    setCurrentLeg({
      ...currentLeg,
      [game.currentPlayerUuid]: new Array(legMax).fill(null)
    })
  }, [game.currentPlayerUuid])

  return {
    currentLeg,
    setCurrentLeg
  }
}