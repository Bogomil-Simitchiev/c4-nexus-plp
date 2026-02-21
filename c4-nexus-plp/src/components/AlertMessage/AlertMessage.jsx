import { useEffect } from 'react'
import styles from './AlertMessage.module.css'

export default function AlertMessage({ message, visible, onHide }) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onHide, 3000)
    return () => clearTimeout(timer)
  }, [visible, onHide])

  return (
    <div className={`${styles.alertMessage} ${visible ? styles.show : ''}`} role="alert">
      <span className={styles.icon}>✓</span>
      {message}
    </div>
  )
}
