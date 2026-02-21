import { useEffect, useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import data from "../data/data.json";
import styles from "./CategoryPage.module.css";

const { categories, products } = data;
const PAGE_SIZE = 12;

function CategoryPage({ categoryId }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const category = categories[categoryId];

  // Filter
  let filtered = products.filter((p) => p.cat === categoryId);

  const visibleProducts = filtered.slice(0, visibleCount);

  const hasMore = visibleCount < filtered.length;

  return (
    <main className={styles.main}>
      <div className={styles.categoryHeader}>
        <h1 className={styles.title}>{category.label}</h1>
        <p className={styles.desc}>{category.description}</p>
      </div>

      <div className={styles.row}>
        <div className={styles.content}>
          <ProductList
            products={visibleProducts}
            onAddToCart={(name) => {
              setToastMsg(`"${name}" added to cart!`);
              setToastVisible(true);
            }}
          />
          <div className={styles.loadMoreWrap}>
            <button
              className={styles.loadMoreBtn}
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              disabled={!hasMore}
            >
              {hasMore ? "Load More" : "All products shown"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CategoryPage;
