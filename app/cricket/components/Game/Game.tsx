"use client"
import { CheatBar } from '@/app/components/CheatBar'
import { GameContext, type GameType } from '@/app/contexts/game'
import { PlayersContext } from '@/app/contexts/players'
import { useCurrentLeg } from '@/app/useCurrentLeg'
import { useContext, useEffect, useState, type FC } from 'react'
import styles from './Game.module.scss'

interface Props {
  game: GameType
}

type Target = '20' | '19' | '18' | '17' | '16' | '15' | '25'
type Progress = Record<Target, number>
type PlayerUuid = string
type PlayerOverview = {
  score: number
  progress: Progress
}

type Overview = Record<PlayerUuid, PlayerOverview>

const targets: Target[] = ['20', '19', '18', '17', '16', '15', '25']
const progressStates = ['empty', 'single', 'double', 'triple']

const initOverview = (game: GameType) => {
  const overview: Overview = {}

  game.playersUuid.forEach((uuid) => {
    overview[uuid] = {
      score: 0,
      progress: targets.reduce((acc, curr) => {
        acc[curr] = 0
        return acc
      }, {} as Progress)

    }
  });

  return overview
}

const getNextPlayer = (game: GameType) => {
  const index = game.playersUuid.indexOf(game.currentPlayerUuid)
  if (index === game.playersUuid.length - 1) {
    return game.playersUuid[0]
  }
  return game.playersUuid[index + 1]
}

export const Game: FC<Props> = ({ game }) => {
  const legMax = 3
  const roundMax = 20
  const { setGame } = useContext(GameContext)
  const { players } = useContext(PlayersContext)
  const { currentLeg } = useCurrentLeg(game, legMax)
  const [overview, setOverview] = useState<Overview>(initOverview(game))
  const [closedTargets, setClosedTargets] = useState<Target[]>([])
  const [round, setRound] = useState<number>(0)

  useEffect(() => {
    if (game.playersUuid.indexOf(game.currentPlayerUuid) === 0) {
      setRound(round + 1)
    }
  }, [game.currentPlayerUuid])

  // Switch player and check if winner
  useEffect(() => {
    const lastShots = currentLeg[game.currentPlayerUuid].filter((shot) => !!shot)
    const lastShot = lastShots[(lastShots.length - 1)]

    if (lastShot) {
      const target = String(lastShot.segment.Section as unknown) as Target
      const currentProgressForTarget = overview[game.currentPlayerUuid].progress[target]
      const newProgressForTarget = currentProgressForTarget + lastShot.segment.Type <= 3 ? currentProgressForTarget + lastShot.segment.Type : 3
      let newScore = overview[game.currentPlayerUuid].score

      if (!closedTargets.includes(target)) {
        if (currentProgressForTarget === 3) {
          newScore += lastShot.segment.Type * lastShot.segment.Section
        } else if (currentProgressForTarget + lastShot.segment.Type > 3) {
          newScore = ((currentProgressForTarget + lastShot.segment.Type) - 3) * lastShot.segment.Section
        }
      }

      if (targets.includes(target)) {
        setOverview({
          ...overview,
          [game.currentPlayerUuid]: {
            score: newScore,
            progress: {
              ...overview[game.currentPlayerUuid].progress,
              [target]: newProgressForTarget
            }
          }
        })
      }
    }

    if (currentLeg[game.currentPlayerUuid].filter((shot) => !!shot).length === legMax) {
      let params: Record<string, string> = { currentPlayerUuid: getNextPlayer(game) }

      setGame({
        ...game,
        ...params
      } as GameType)
    }
  }, [currentLeg])

  useEffect(() => {
    const winner = Object.keys(overview).reduce((acc: string[], curr) => {
      const isWinner = Object.keys(overview[curr].progress).filter(target => overview[curr].progress[target as Target] === 3)?.length === targets.length
      if (isWinner) {
        acc.push(curr)
      }
      return acc
    }, [] as string[])

    if (winner.length || round === roundMax + 1) {
      const chart = Object.keys(overview).sort((a, b) => overview[a].score - overview[b].score)
      setGame({
        ...game,
        winnerUuid: chart[0]
      })
    }
  }, [closedTargets, round])

  // Gets the closed targets
  useEffect(() => {
    const newClosedtargets = targets.filter((target) => {
      const playersTarget: number[] = []
      Object.keys(overview).forEach((uuid) => {
        playersTarget.push(overview[uuid].progress[target])
      });
      return playersTarget.every((progress) => progress === 3)
    })
    setClosedTargets(newClosedtargets)
  }, [overview])

  // Winner screen
  if (game.winnerUuid) {
    return (
      <div className={styles.container}>
        <h1>{players.find((player) => game.currentPlayerUuid === player.uuid)?.name} a gagné !</h1>
      </div>
    )
  }

  return <div className={styles.container}>
    <table className={styles.table}>
      <tr>
        <td></td>
        {game.playersUuid.map((uuid) => (
          <td>
            <div className={uuid === game.currentPlayerUuid ? styles.currentName : styles.name}>
              <i className='bx bxs-right-arrow'></i>
              <span>{players.find((player) => uuid === player.uuid)?.name}</span>
              <i className='bx bxs-left-arrow'></i>
            </div>
          </td>))}
        <td></td>
      </tr>
      {targets.map((target) => (
        <tr className={closedTargets?.includes(target) ? styles.closed : ''}>
          <td className={styles.target}>{target === '25' ? 'Bull' : target}</td>
          {game.playersUuid.map((uuid) => <td style={{ width: `${100 / game.playersUuid.length}%` }}><div className={styles.progress}><div className={styles[progressStates[overview[uuid].progress[target]]]} /></div></td>)}
          <td className={styles.target}>{target === '25' ? 'Bull' : target}</td>
        </tr>
      ))}
      <tr>
        <td></td>
        {game.playersUuid.map((uuid) => (
          <td>
            <span className={styles.score} style={{ backgroundColor: uuid === game.currentPlayerUuid ? players.find((player) => uuid === player.uuid)?.color : '#ccc' }}>{overview[uuid].score}</span>
          </td>
        ))}
        <td></td>
      </tr>
    </table>
    <CheatBar />
  </div>
}