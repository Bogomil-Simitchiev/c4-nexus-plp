import { useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import data from "../data/data.json";
import styles from "./CategoryPage.module.css";
import Toolbar from "../components/Toolbar/Toolbar";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import FilterProducts from "../components/FilterProducts/FilterProducts";

const { categories, priceRanges, products } = data;
const PAGE_SIZE = 12;

function CategoryPage({ categoryId }) {
  const [selectedColors, setSelectedColors]     = useState([])
  const [selectedRangeIdx, setSelectedRangeIdx] = useState(null)
  const [saleOnly, setSaleOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortMode, setSortMode] = useState('default')
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const category = categories[categoryId];

  // Filter logics
  let filtered = products.filter((p) => p.cat === categoryId);
  // filter by selected colors if any
  if (selectedColors.length > 0) {
    filtered = filtered.filter(p => selectedColors.includes(p.colorHex))
  }
  // filter by selected price range if any
  if (selectedRangeIdx !== null) {
    const range = priceRanges[selectedRangeIdx]
    filtered = filtered.filter(p => {
      const price = p.salePrice ?? p.price
      return price >= range.min && price <= range.max
    })
  }
  // filter by sale only if toggled
  if (saleOnly) {
    filtered = filtered.filter(p => p.salePrice !== null)
  }

  // Sort logics
  if (sortMode === 'az')   filtered.sort((a, b) => a.name.localeCompare(b.name))
  if (sortMode === 'za')   filtered.sort((a, b) => b.name.localeCompare(a.name))
  if (sortMode === 'lohi') filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
  if (sortMode === 'hilo') filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))

  const visibleProducts = filtered.slice(0, visibleCount);

  const hasMore = visibleCount < filtered.length;

  // Handlers for filter/sort controls
   function handleSort(val) {
    setSortMode(val);
    setVisibleCount(PAGE_SIZE);
  }

  function handleColorToggle(hex) {
    setSelectedColors(prev =>
      prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]
    )
    setVisibleCount(PAGE_SIZE)
  }

  function handleRangeToggle(idx) {
    setSelectedRangeIdx(prev => prev === idx ? null : idx)
    setVisibleCount(PAGE_SIZE)
  }

  function handleSaleToggle() {
    setSaleOnly(prev => !prev)
    setVisibleCount(PAGE_SIZE)
  }

  function handleClear() {
    setSelectedColors([])
    setSelectedRangeIdx(null)
    setSaleOnly(false)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <main className={styles.main}>
      <div className={styles.categoryHeader}>
        <h1 className={styles.title}>{category.label}</h1>
        <p className={styles.desc}>{category.description}</p>
      </div>

      <div className={styles.row}>
        <FilterProducts
            categoryId={categoryId}
            allProducts={products}
            selectedColors={selectedColors}
            selectedRangeIdx={selectedRangeIdx}
            priceRanges={priceRanges}
            saleOnly={saleOnly}
            onColorToggle={handleColorToggle}
            onRangeToggle={handleRangeToggle}
            onSaleToggle={handleSaleToggle}
            onClear={handleClear}
          />
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
