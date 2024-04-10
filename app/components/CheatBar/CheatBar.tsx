import { GranboardContext } from "@/app/contexts/granboard"
import { useContext, useState } from "react"
import styles from './CheatBar.module.scss';

export const CheatBar = () => {
  const { simulateHit } = useContext(GranboardContext)
  const [type, setType] = useState<number>(1)
  const [section, setSection] = useState<number>(1)

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(Number(event.target.value))
  }

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(Number(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    simulateHit(type, section)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <select onChange={handleTypeChange} value={type}>
        <option value={1}>Simple</option>
        <option value={2}>Double</option>
        <option value={3}>Triple</option>
      </select>
      <select onChange={handleSectionChange} value={section}>
        {new Array(20).fill(null).map((_, index) => <option value={index + 1}>{index + 1}</option>)}
        <option value={25}>Bull</option>
      </select>
      <button type="submit" disabled={type === 3 && section === 25}>Hit</button>
    </form>
  )
}