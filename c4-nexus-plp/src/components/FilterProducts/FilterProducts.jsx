import { useEffect, useState } from 'react'
import styles from './FilterProducts.module.css'

function getUniqueColors(products, catId) {
  const unique = new Set()
  const result = []
  for (const p of products.filter(p => p.cat === catId)) {
    if (!unique.has(p.colorHex)) {
      unique.add(p.colorHex)
      result.push({ hex: p.colorHex, name: p.color })
    }
  }
  return result
}

const mobileViewBreakpoint = 860;

export default function FilterPanel({
  categoryId,
  allProducts,
  selectedColors,
  selectedRangeIdx,
  priceRanges,
  saleOnly,
  onColorToggle,
  onRangeToggle,
  onSaleToggle,
  onClear,
}) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > mobileViewBreakpoint)
  // Here I add a resize listener to automatically open/close the panel based on screen width
  useEffect(() => {
  function handleResize() {
    setIsOpen(window.innerWidth > mobileViewBreakpoint)
  }
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

  // Here I get all unique colors for the current category to display in the filter panel.
  const colors = getUniqueColors(allProducts, categoryId)

  const hasFilters = selectedColors.length > 0 || selectedRangeIdx !== null || saleOnly

  return (
    <aside className={styles.panel}>
      <button className={styles.toggleBtn} onClick={() => setIsOpen(v => !v)}>
        <span>Filters</span>
        {hasFilters && <span className={styles.dot} />}
        <span className={styles.arrow}>{isOpen ? '▾' : '▸'}</span>
      </button>

      {isOpen && (
        <div className={styles.body}>
          <div className={styles.topRow}>
            <span className={styles.label}>Filter by:</span>
            {hasFilters && (
              <button className={styles.clearBtn} onClick={onClear}>Clear all</button>
            )}
          </div>

          {/* Colors logic here */}
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>Color</h4>
            <div className={styles.swatches}>
              {colors.map(col => (
                <button
                  key={col.hex}
                  title={col.name}
                  aria-label={col.name}
                  aria-pressed={selectedColors.includes(col.hex)}
                  className={`${styles.swatch} ${selectedColors.includes(col.hex) ? styles.swatchActive : ''}`}
                  style={{
                    background: col.hex,
                    border: col.hex === '#f5f0eb' ? '1px solid #ccc' : '2px solid transparent',
                  }}
                  onClick={() => onColorToggle(col.hex)}
                />
              ))}
            </div>
          </div>

          {/* Price ranges logic here */}
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>Price</h4>
            {priceRanges.map((range, idx) => (
              <label key={idx} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedRangeIdx === idx}
                  onChange={() => onRangeToggle(idx)}
                />
                {range.label}
              </label>
            ))}
          </div>

          {/* On sale logic here */}
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>Availability</h4>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={saleOnly}
                onChange={onSaleToggle}
              />
              On Sale
            </label>
          </div>
        </div>
      )}
    </aside>
  )
}
