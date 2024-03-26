import { GameContext, GameType } from "@/app/contexts/game"
import { type FC, useContext, useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import styles from './Players.module.scss'
import { type PlayerType, PlayersContext } from "@/app/contexts/players";
import uniqolor from "uniqolor";

const getNewPlayer = (name: string): PlayerType => {
  const uuid = uuidv4()
  return {
    name,
    uuid,
    color: uniqolor(uuid).color,
    initials: name[0].toUpperCase()
  }
}

interface Props {
  onGameStart: () => void
}

export const Players: FC<Props> = ({ onGameStart }) => {
  const { players, setPlayers } = useContext(PlayersContext)
  const { game, setGame } = useContext(GameContext)
  const [newPlayer, setNewPlayer] = useState('')
  const [addingPlayer, setAddingPlayer] = useState(false)
  const newPlayerInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setNewPlayer('')
  }, [players])

  const onChangeNewPlayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayer(e.target.value)
  }

  const onAddPlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPlayers([...players, getNewPlayer(newPlayer)])
    setAddingPlayer(false)
  }

  const handleAddPlayerToGame = (uuid: string) => () => setGame({
    ...game,
    playersUuid: game?.playersUuid ? [...game?.playersUuid, uuid] : [uuid]
  } as GameType)

  const handleRemovePlayerFromGame = (uuid: string) => () => setGame({
    ...game,
    playersUuid: game?.playersUuid.filter((item) => item !== uuid)
  } as GameType)

  useEffect(() => {
    if (addingPlayer) newPlayerInput?.current?.focus()
  }, [addingPlayer])

  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>Qui va jouer ?</h1>
        {game?.playersUuid.length ? (
          <ul className={styles.list}>
            {game.playersUuid.map((uuid) => {
              const player = players.find((player) => player.uuid === uuid)
              return player && (
                <li key={uuid}>
                  <button className={styles.selectPlayer} onClick={handleRemovePlayerFromGame(uuid)}>
                    <span className={styles.avatar} style={{ backgroundColor: player.color }}>{player.initials}</span>
                    <span className={styles.name}>{player.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className={styles.message}>Aucun joueur selectionné pour la partie.</p>
        )}
      </section>
      <section>
        <h2 className={styles.title}>Profils</h2>
        <ul className={styles.list}>
          {players.filter((player) => !game?.playersUuid.includes(player.uuid)).map((player) => (
            <li key={player.uuid}>
              <button className={styles.selectPlayer} onClick={handleAddPlayerToGame(player.uuid)}>
                <span className={styles.avatar} style={{ backgroundColor: player.color }}>{player.initials}</span>
                <span className={styles.name}>{player.name}</span>
              </button>
              <button onClick={() => setPlayers(players.filter(({ uuid }) => uuid !== player.uuid))} className={styles.delete}>Supprimer</button>
            </li>
          ))}
          <li>
            <button className={styles.add} onClick={() => setAddingPlayer(true)}><i className='bx bx-plus'></i></button>
          </li>
        </ul>
      </section>
      {game && (
        <div className={styles.bottomBar}>
          {game.playersUuid.length > 1 && <>{game.playersUuid.length} joueurs sont prêts</>}
          {game.playersUuid.length === 1 && <>{game.playersUuid.length} joueur est prêt</>}
          {!game.playersUuid.length && <>Aucun joueur n'est prêt</>}
          <button disabled={!game.playersUuid.length || game.playersUuid.length === 1} className={styles.button} onClick={onGameStart}>Jouer</button>
        </div>
      )}
      {addingPlayer && (
        <>
          <button className={styles.overlay} onClick={() => setAddingPlayer(false)}></button>
          <div className={styles.modal}>
            <h1 className={styles.title}>Ajouter profil</h1>
            <form onSubmit={onAddPlayer}>
              <input className={styles.input} ref={newPlayerInput} type="text" value={newPlayer} onChange={onChangeNewPlayer} placeholder="Nom du joueur" />
              <button className={styles.addButton} type="submit" disabled={!newPlayer}>Ajouter</button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}