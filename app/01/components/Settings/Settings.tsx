import { FC } from "react"
import styles from './Settings.module.scss'
interface Props {
  onSettingsSave: () => void
}

export const Settings: FC<Props> = ({ onSettingsSave }) => {
  // 301, 501, 701, 901, 1101, and 1501.
  const onSettingsChange = () => {

  }
  return (
    <>
      <h1>Settings</h1>

      <form onSubmit={onSettingsSave}>
        <div className={styles.field}>
          <label htmlFor="301">301</label>
          <input name="mode" type="radio" id="301" checked />
        </div>
        <div className={styles.field}>
          <label htmlFor="501">501</label>
          <input name="mode" type="radio" id="501" />
        </div>
        <div className={styles.field}>
          <label htmlFor="701">701</label>
          <input name="mode" type="radio" id="701" />
        </div>
        <div className={styles.field}>
          <label htmlFor="901">901</label>
          <input name="mode" type="radio" id="901" />
        </div>
        <div className={styles.field}>
          <label htmlFor="1101">1101</label>
          <input name="mode" type="radio" id="1101" />
        </div>
        <div className={styles.field}>
          <label htmlFor="1501">1501</label>
          <input name="mode" type="radio" id="1501" />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}