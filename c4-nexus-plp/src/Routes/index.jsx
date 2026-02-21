import { Routes, Route, Navigate } from "react-router-dom";
import CategoryPage from "../pages/CategoryPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/bags" replace />} />
      <Route path="/bags" element={<CategoryPage key="bags" categoryId="bags" />} />
      <Route path="/shoes" element={<CategoryPage key="shoes" categoryId="shoes" />} />
      <Route path="*" element={<Navigate to="/bags" replace />} />
    </Routes>
  );
}

export default AppRoutes;
