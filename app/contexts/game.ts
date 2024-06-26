"use client";
import { Segment } from "@/services/boardinfo";
import { createContext } from "react";

export type Shot = {
  uuid: string
  playerUuid: string
  time: string
  segment: Segment
}

export type GameType = {
  uuid?: string,
  mode?: string,
  history: Shot[]
  currentPlayerUuid: string,
  playersUuid: string[],
  winnerUuid?: string,
  settings?: Record<string, unknown>
}

export type GameContextType = {
  game: GameType | null
  setGame: (game: GameType | null) => void
  initGame: (mode: string) => void
}

export const GameContext = createContext<GameContextType>({
  game: null,
  setGame: () => { },
  initGame: () => { }
})