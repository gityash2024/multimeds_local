import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";

// import { CartProvider } from "./CartContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Legal from "./pages/Legal";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Transaction from "./pages/Transaction";
import PrescriptionAnalyzed from "./components/Cart/PrescriptionAnalyzed";
import Process from "./pages/Process";
import Products from "./pages/Products";
import Account from "./pages/Account";
import OrderDetails from "./components/Account/OrderDetails";
import Footer from "./components/Footer";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogDetails from "./components/blogdetails";
const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem("userInfo");

  if (!isUserLoggedIn) {
    // Redirect to the home page if the user is not logged in
    return <Navigate to="/" state={{ openLoginModal: true }} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="contact-us"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="blogDetails"
          element={
            // <ProtectedRoute>
              <BlogDetails />
            // </ProtectedRoute>
          }
        />
        <Route
          path="privacypolicy"
          element={
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="shippingpolicy"
          element={
            <ProtectedRoute>
              <ShippingPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="returnpolicy"
          element={
            <ProtectedRoute>
              <ReturnPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="terms-and-conditions"
          element={
            <ProtectedRoute>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="legal"
          element={
            <ProtectedRoute>
              <Legal />
            </ProtectedRoute>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="account/orders/order-details"
          element={
            <ProtectedRoute>
              <OrderDetails orderStatus="Arriving" />
            </ProtectedRoute>
          }
        />
        <Route
          path="process"
          element={
            <ProtectedRoute>
              <Process />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="search-results"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="prescription-analyzed"
          element={
            <ProtectedRoute>
              <PrescriptionAnalyzed />
            </ProtectedRoute>
          }
        />
        {/* Add any additional protected routes here */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
