import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route path="/bags"  element={<CategoryPage/>} />
  </Routes>
);

export default AppRoutes;