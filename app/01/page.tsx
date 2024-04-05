"use client";

import { useContext, useState } from "react";
import { Players } from "../components/Players";
import { GameContext } from "../contexts/game";
import { Game } from "./components/Game";
import { Settings } from "./components/Settings";

const Game01 = () => {
  const { game, initGame, setGame } = useContext(GameContext)
  const [settings, setSettings] = useState({})

  const handleGameStart = () => {
    initGame('01')
  }

  const handleSettingsSave = () => {
    setSettings({})
  }

  if (game && game.playersUuid.length && game.uuid) {
    return <Game game={game} />
  }

  if (settings) {
    return <Players onGameStart={handleGameStart} />
  }

  return <Settings onSettingsSave={handleSettingsSave} />
}

export default Game01