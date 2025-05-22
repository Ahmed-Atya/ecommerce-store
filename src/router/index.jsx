import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import ProductsDetailsPage from "../pages/ProductDetailsPage.jsx";
import AppLayout from "../layout/AppLayout.jsx";
import HomePage from "../pages/index.jsx";
import LoginPage from "../pages/loginPage.jsx";
import cookieService from "../services/cookies";

import DashboardLayout from "../layout/dashboardLayout.jsx";
import DashboardSettings from "../pages/dashboard/DashboardSettings.jsx";
import HomeDashboard from "../pages/dashboard/index";
import DashboardCategories from "../pages/dashboard/DashboardCategories";
import DashboardProducts from "../pages/dashboard/DashboardProducts";
import DashboardUsers from "../pages/dashboard/DashboardUsers";
import RegisterPage from "../pages/registerPage.jsx";


const token = cookieService.get("jwt");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="dashboard" element={<HomeDashboard />} />
        <Route path="products/:documentId" element={<ProductsDetailsPage />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<HomeDashboard />} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="categories" element={<DashboardCategories />} />
        <Route path="users" element={<DashboardUsers />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>

      <Route path="login" element={<LoginPage isAuthenticated={token} />} />
      
      <Route path="register" element={<RegisterPage isAuthenticated={token} />} />
    </>
  )
);

export default router;
