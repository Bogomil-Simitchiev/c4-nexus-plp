import { Link } from "react-router-dom";
import styles from "./Product.module.css";

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <span key={i} className={styles.starFull}>
          ★
        </span>,
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <span key={i} className={styles.starHalf}>
          ★
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className={styles.starEmpty}>
          ☆
        </span>,
      );
    }
  }
  return stars;
}

export default function Product({ product, onAddToCart, animDelay }) {
  const { id, name, description, price, salePrice, rating, ratingCount, color, colorHex, isNew, image } = product

  const effectivePrice = salePrice ?? price;
  const discountPct = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : null;

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      <div className={styles.imageWrap}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />

        {salePrice ? (
          <span className={`${styles.badge} ${styles.badgeSale}`}>
            -{discountPct}%
          </span>
        ) : isNew ? (
          <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>
        ) : null}
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <Link to={`/product/${id}`} className={styles.nameLink}>
          <h3 className={styles.name}>{name}</h3>
        </Link>

        <p className={styles.desc}>{description}</p>

        {/* Stars */}
        <div className={styles.stars}>
          <span className={styles.starIcons}>{renderStars(rating)}</span>
          <span className={styles.ratingCount}>({ratingCount})</span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span
            className={`${styles.price} ${salePrice ? styles.priceSale : ""}`}
          >
            €{effectivePrice.toFixed(2)}
          </span>
          {salePrice && (
            <span className={styles.priceOriginal}>€{price.toFixed(2)}</span>
          )}
        </div>

        {/* Color */}
        <div className={styles.colorRow}>
          <span
            className={styles.colorDot}
            style={{
              background: colorHex,
              border: colorHex === "#f5f0eb" ? "1px solid #ccc" : "none",
            }}
          />
          <span className={styles.colorName}>{color}</span>
        </div>

        {/* Add to cart button */}
        <button className={styles.addBtn} onClick={() => onAddToCart(name)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
