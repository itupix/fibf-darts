import { type GameType } from "@/app/contexts/game"
import { type FC } from "react"

interface Props {
  game: GameType
}

export const Game: FC<Props> = ({ game }) => {
  return (
    <h1>01</h1>
  )
}