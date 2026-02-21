import styles from './Toolbar.module.css'

const sort_options = [
  { value: 'default', label: 'Featured' },
  { value: 'az',      label: 'Name A–Z' },
  { value: 'za',      label: 'Name Z–A' },
  { value: 'lohi',    label: 'Price: Low to High' },
  { value: 'hilo',    label: 'Price: High to Low' },
]

export default function Toolbar({ shown, total, sortMode, onSort }) {
  return (
    <div className={styles.toolbar}>
      <p className={styles.counter} aria-live="polite">
        Showing <strong>{shown}</strong> out of <strong>{total}</strong> products
      </p>

      <div className={styles.sortWrap}>
        <label htmlFor="sort-select" className={styles.sortLabel}>Sort:</label>
        <select
          id="sort-select"
          className={styles.sortSelect}
          value={sortMode}
          onChange={e => onSort(e.target.value)}
        >
          {sort_options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
