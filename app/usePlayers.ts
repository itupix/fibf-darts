import { useEffect, useState } from "react";
import { PlayerType } from "./contexts/players";

const getPlayersFromLocalStorage = () => {
  const data = localStorage.getItem('players')
  if (data) return JSON.parse(data)
  return []
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<PlayerType[]>(getPlayersFromLocalStorage())

  useEffect(() => {
    if (players) localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  return {
    players,
    setPlayers
  }
}