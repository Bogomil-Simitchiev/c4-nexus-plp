import data from '../data/data.json'
import styles from './CategoryPage.module.css'

const { categories  } = data

function CategoryPage({ categoryId }) {
 
  const category = categories[categoryId]

  return (
    <main className={styles.main}>
      <div className={styles.categoryHeader}>
        <h1 className={styles.title}>{category.label}</h1>
        <p className={styles.desc}>{category.description}</p>
      </div>

      <div className={styles.row}>

        <div className={styles.content}>
          <div className={styles.loadMoreWrap}>
            <button
              className={styles.loadMoreBtn}
            > Load More
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CategoryPage
