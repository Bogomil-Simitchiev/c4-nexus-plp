import Product from './Product/Product'
import styles from './ProductList.module.css'

export default function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No products found</h3>
        <p>Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <Product
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          animDelay={Math.min(index, 7) * 40}
        />
      ))}
    </div>
  )
}
