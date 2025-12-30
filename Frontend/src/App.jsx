import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Home from "./pages/Home/Home"
import ProductProcess from "./pages/ProductProcess/ProductProcess"
import Cart from "./pages/Cart/Cart"
import ContactUs from "./pages/ContactUs/ContactUs"
import AboutUs from "./pages/AboutUs/AboutUs"
import CategoryPage from "./pages/CategoryPage/CategoryPage"

import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"
import UserProfile from "./components/User/UserProfile"
import ProtectedRoute from "./components/Auth/ProtectedRoute"

import { AuthProvider } from "./Context/AuthContext"
import { CartProvider } from "./Context/CartContext"
import { useCartSync } from "./hooks/useCartSync"

import "./App.css"

// Component to handle cart syncing
function AppContent() {
  useCartSync() // This will sync cart when user changes

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductProcess />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <Footer />
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
