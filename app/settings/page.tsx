"use client";
import { useGranboard } from "../useGranboard"
import styles from './settings.module.scss'

export default function Page() {
  const { connectionState, onConnectionTest } = useGranboard()

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
    </section>
  )
}