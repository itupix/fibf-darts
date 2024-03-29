"use client";

import { useContext } from "react";
import { Players } from "../components/Players";
import { GameContext } from "../contexts/game";
import { Game } from "./components/Game";

const Cricket = () => {
  const { game, initGame } = useContext(GameContext)

  const handleGameStart = () => {
    initGame('cricket')
  }

  if (game && game.playersUuid.length && game.uuid) {
    return <Game game={game} />
  }

  return (
    <Players onGameStart={handleGameStart} />
  )

}

export default Cricket