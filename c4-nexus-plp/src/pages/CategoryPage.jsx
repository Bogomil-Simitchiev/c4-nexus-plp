import { useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import data from "../data/data.json";
import styles from "./CategoryPage.module.css";
import Toolbar from "../components/Toolbar/Toolbar";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";

const { categories, products } = data;
const PAGE_SIZE = 12;

function CategoryPage({ categoryId }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortMode, setSortMode] = useState('default')
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  function handleSort(val) {
    setSortMode(val)
    setVisibleCount(PAGE_SIZE)
  }

  const category = categories[categoryId];

  // Filter logics
  let filtered = products.filter((p) => p.cat === categoryId);

  // Sort logics
  if (sortMode === 'az')   filtered.sort((a, b) => a.name.localeCompare(b.name))
  if (sortMode === 'za')   filtered.sort((a, b) => b.name.localeCompare(a.name))
  if (sortMode === 'lohi') filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
  if (sortMode === 'hilo') filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))

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
          <Toolbar
            shown={visibleProducts.length}
            total={filtered.length}
            sortMode={sortMode}
            onSort={handleSort}
          />
          <ProductList
            products={visibleProducts}
            onAddToCart={(name) => {
              setAlertMsg(`"${name}" added to cart!`);
              setAlertVisible(true);
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
      
      <AlertMessage
        message={alertMsg}
        visible={alertVisible}
        onHide={() => setAlertVisible(false)}
      />
      <ScrollToTopButton />
    </main>
  );
}

export default CategoryPage;
