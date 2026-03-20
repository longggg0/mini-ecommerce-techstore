import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainLayouts from "./layouts/MainLayouts"
import Dashboard from "./layouts/Dashboard"
import { HomePage } from "./pages/HomePage"
import { ProductDetailPage } from "./pages/ProductDetailPage"
import { CartPage } from "./pages/CartPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { CartProvider } from "./context/CartContext"
import { AdminDashboardPage } from "./pages/AdminDashboardPage"
import { AdminProductsPage } from "./pages/AdminProductPage"
import { AdminOrdersPage } from "./pages/AdminOrderPage"
import { AdminCategoryPage } from "./pages/AdminCategoryPage"
import { ContactPage } from "./pages/ContactUs"
import { OrderHistoryPage } from "./pages/OrderHistoryPage"
import { AdminProtectRoute } from "./components/AdminProtectRoute"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>

          <Routes>

            {/* USER ROUTES */}
            <Route element={<MainLayouts />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/product-detail/:id" element={<ProductDetailPage />} />
              <Route path="/cart-page" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* <Route path="/complete-order" element={<CompleteOrderPage />} /> */}
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/order-history" element={<OrderHistoryPage />} />
            </Route>

            
            <Route
              element={
                <AdminProtectRoute>
                  <Dashboard />
                </AdminProtectRoute>
              }
            >
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin-productPage" element={<AdminProductsPage />} />
              <Route path="/admin-order" element={<AdminOrdersPage />} />
              <Route path="/admin-category" element={<AdminCategoryPage />} />
            </Route>

            
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/register-page" element={<RegisterPage />} />

          </Routes>

        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}
export default App