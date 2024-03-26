import { createContext } from "react";

export type PlayerType = {
  uuid: string
  name: string
  color: string
  initials: string
}

type PlayersContextType = {
  players: PlayerType[]
  setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>
}

export const PlayersContext = createContext<PlayersContextType>({
  players: [],
  setPlayers: () => { },
});
