"use client";
import styles from './Content.module.scss'
import { Header } from '../Header';
import { useGranboard } from '@/app/useGranboard';
import { GranboardContext } from '@/app/contexts/granboard';
import { ReactNode, type FC, useEffect } from 'react';
import { ProfileContext } from '@/app/contexts/profile';
import { useProfile } from '@/app/useProfile';
import { GameContext, Shot } from '@/app/contexts/game';
import { useGame } from '@/app/useGame';
import { PlayersContext } from '@/app/contexts/players';
import { usePlayers } from '@/app/usePlayers';
import { v4 } from 'uuid';

interface Props {
  children: ReactNode
}

export const Content: FC<Props> = ({ children }) => {
  const targetContext = useGranboard()
  const profileContext = useProfile()
  const gameContext = useGame()
  const playersContext = usePlayers()

  useEffect(() => {
    if (targetContext.segment && gameContext.game) {
      gameContext.setGame({
        ...gameContext.game,
        history: [
          ...gameContext.game.history,
          {
            playerUuid: gameContext.game.currentPlayerUuid,
            uuid: v4(),
            time: String(new Date()),
            segment: targetContext.segment,
          } as Shot
        ]
      })
    }
  }, [targetContext.segment])

  return (
    <ProfileContext.Provider value={profileContext}>
      <GameContext.Provider value={gameContext}>
        <GranboardContext.Provider value={targetContext}>
          <PlayersContext.Provider value={playersContext}>
            <Header />
            <main className={styles.main}>
              {children}
            </main>
          </PlayersContext.Provider>
        </GranboardContext.Provider>
      </GameContext.Provider>
    </ProfileContext.Provider>
  )
}