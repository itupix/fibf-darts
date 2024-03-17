import Link from "next/link";
import styles from './Header.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <Link href="/" className={styles.home}><i className='bx bxs-home'></i></Link>
    <Link href="/settings" className={styles.settings}><i className='bx bxs-cog'></i></Link>
  </header>
)