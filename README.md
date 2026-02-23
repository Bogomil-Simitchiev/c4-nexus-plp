# 🛍️ NexusStore — Product Listing Page

A front-end Product Listing Page (PLP).  
The app simulates a standard e-commerce category browsing experience with filtering, sorting and routing.

## 🧰 Tech Stack

- ⚛️ **React** — UI library
- ⚡ **Vite** — build tool and dev server
- 🔀 **React Router** — client-side routing
- 🎨 **CSS Modules** — scoped component styles

---

## 📁 Project Structure

```
c4-nexus-plp/
├── public/
│   └── assets/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── FilterProducts/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── ProductList/Product
│   │   ├── ScrollToTopButton/
│   │   ├── AlertMessage/
│   │   └── Toolbar/
│   ├── data/
│   │   └── data.json         # all product and category data
│   ├── pages/
│   │   └── CategoryPage.jsx  # PLP — /bags and /shoes
│   ├── Routes/
│   │   └── index.jsx         # route definitions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js
- npm

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Bogomil-Simitchiev/c4-nexus-plp

# 2. Navigate into the project folder
cd c4-nexus-plp
cd c4-nexus-plp

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 🛠️ Other Commands

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔀 Routes

| Path | Page |
|---|---|
| `/` | Redirects to `/bags` |
| `/bags` | Bags category listing |
| `/shoes` | Shoes category listing |

---

## ✨ Features

- 📌 **Sticky header** with logo and category navigation
- 🗂️ **ProductList component** — 4 columns, loads 12 products per page
- ➕ **Load More** button — reveals the next 12 products until all are shown
- 🔢 **Product counter** — "Showing X out of Y products" (configurable per page)
- 🔍 **Filtering** — by color swatches, price range checkboxes, and on-sale toggle
- 🔃 **Sorting** — Featured, Name A–Z, Name Z–A, Price Low→High, Price High→Low
- 🛒 **Add to Cart** — show notification on click
- 📱 **Fully responsive** — desktop, tablet and mobile layouts (using media queries)
- 📄 **Sample data** — generated in `src/data/data.json`

---

## 📝 Implementation Notes

All data is stored in a single `data.json` file containing categories, price ranges and products. No backend or API calls are made — the app is entirely front-end.

State management uses React's built-in `useState` and `useEffect`. No external state library (e.g. Redux or Context) was needed since all filtering or sorting state is local to `CategoryPage`.

`BrowserRouter` is mounted in `main.jsx` so that all components, including `Header`, have access to router hooks like `useLocation` and `useNavigate`.

---

## 👨‍💻 Author

**Bogomil Simitchiev**  
📧 simitchiev365@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/bogomil-simitchiev-97593724b/)

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it.
