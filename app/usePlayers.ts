"use client"
import { useEffect, useState } from "react";
import { PlayerType } from "./contexts/players";

const getPlayersFromLocalStorage = () => {
  const data = typeof window !== 'undefined' ? localStorage.getItem('players') : null
  if (data) return JSON.parse(data)
  return []
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<PlayerType[]>(getPlayersFromLocalStorage())

  useEffect(() => {
    if (players && typeof window !== 'undefined') localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  return {
    players,
    setPlayers
  }
}