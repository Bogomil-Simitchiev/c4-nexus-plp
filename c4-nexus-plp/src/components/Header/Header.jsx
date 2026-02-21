import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import data from '../../data/data.json'
import styles from './Header.module.css'

const { categories } = data

export default function Header({ activeCat }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleCatClick(catId) {
    navigate(`/${catId}`)
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/bags" className={styles.logo}>
          Nexus<span>Store</span>
        </Link>

        <nav className={styles.nav}>
          {Object.values(categories).map(category => (
            <button
              key={category.id}
              className={`${styles.navBtn} ${activeCat === category.id ? styles.active : ''}`}
              onClick={() => handleCatClick(category.id)}
            >
              {category.label}
            </button>
          ))}
        </nav>

        <div className={styles.icons}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileNav}>
          {Object.values(categories).map(category => (
            <button
              key={category.id}
              className={`${styles.mobileNavBtn} ${activeCat === category.id ? styles.active : ''}`}
              onClick={() => handleCatClick(category.id)}
            >
              {category.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
