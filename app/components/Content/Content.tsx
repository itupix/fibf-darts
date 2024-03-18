"use client";
import styles from './Content.module.scss'
import { Header } from '../Header';
import { useGranboard } from '@/app/useGranboard';
import { GranboardContext } from '@/app/contexts/granboard';
import { ReactNode, type FC } from 'react';

interface Props {
  children: ReactNode
}

export const Content: FC<Props> = ({ children }) => {
  const context = useGranboard()
  return (
    <GranboardContext.Provider value={context}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </GranboardContext.Provider>
  )
}