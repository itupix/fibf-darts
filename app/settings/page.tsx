"use client";
import { useContext } from "react";
import styles from './settings.module.scss'
import { GranboardContext } from "../contexts/granboard";
import { ProfileContext } from "../contexts/profile";

export default function Page() {
  const { connectionState, onConnectionTest } = useContext(GranboardContext)
  const { profile, setProfile } = useContext(ProfileContext)

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, name: e.target.value })
  }

  return (
    <section>
      <h1 className={styles.title}>Réglages</h1>
      <div className={styles.field}>
        <span className={styles.label}>Connexion à la cible</span>
        <span className={styles.value}>
          {{
            connecting: 'Connexion en cours ...',
            connected: (<span className={styles.success}><i className='bx bxs-check-circle'></i> Cible connectée</span>),
            standby: (<>
              <span className={styles.warning}><i className='bx bxs-error'></i> Non connecté à la cible</span>
              <button onClick={onConnectionTest} className={styles.button}>Connexion</button>
            </>),

            error: (<>
              <span className={styles.error}><i className='bx bxs-error-alt'></i> Erreur de connexion avec la cible</span>
              <button onClick={onConnectionTest} className={styles.button}>Réessayer</button>
            </>),
          }[connectionState]}
        </span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Votre pseudo</span>
        <span className={styles.value}><input type="text" value={profile?.name} onChange={onNameChange} /></span>
      </div>
    </section>
  )
}