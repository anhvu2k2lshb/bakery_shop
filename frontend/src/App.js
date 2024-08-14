import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import {HomePage} from './pages/buyer/HomePage'
import { LoginPage } from "./pages/buyer/Login";
import { SignupPage } from "./pages/buyer/SignupPage";
import { ActivationPage } from "./pages/buyer/ActivationPage";
import { SellerActivationPage } from "./pages/seller/SellerActivationPage";
import { ProductsPage } from "./pages/buyer/ProductsPage";
import { ProductDetailsPage } from "./pages/buyer/ProductDetailsPage";
import { BestSellingPage } from "./pages/buyer/BestSellingPage";
import { EventsPage } from "./pages/buyer/EventsPage";
import { FAQPage } from "./pages/buyer/FAQPage";
import BuyerProtectedRoute from './protectedRoute/BuyerProtectedRoute';
import SellerProtectedRoute from './protectedRoute/SellerProtectedRoute';
import { CheckoutPage } from "./pages/buyer/CheckoutPage";
import { OrderSuccessPage } from "./pages/buyer/OrderSuccessPage";
import { ProfilePage } from "./pages/buyer/ProfilePage";
import { UserInbox } from "./pages/buyer/UserInbox";
import { OrderDetailsPage } from "./pages/buyer/OrderDetailsPage";
import { TrackOrderPage } from "./pages/buyer/TrackOrderPage";
import { ShopPreviewPage } from "./pages/seller/ShopPreviewPage";
import { ShopSignUpPage } from "./pages/seller/ShopSignUpPage";
import { ShopLoginPage } from "./pages/seller/ShopLoginPage";
import { ShopHomePage } from "./pages/seller/ShopHomePage";
import { ShopSettingsPage } from "./pages/seller/ShopSettingsPage";
import { ShopDashboardPage } from "./pages/seller/ShopDashboardPage";
import { ShopCreateProduct } from "./pages/seller/ShopCreateProduct";
import { ShopAllOrders } from "./pages/seller/ShopAllOrders";
import { ShopAllRefunds } from "./pages/seller/ShopAllRefunds";
import { ShopOrderDetails } from "./pages/seller/ShopOrderDetails";
import { ShopAllProducts } from "./pages/seller/ShopAllProducts";
import { ShopCreateEvents } from "./pages/seller/ShopCreateEvents";
import ShopAllEvents from "./pages/seller/ShopAllEvents";
import ShopAllCoupouns from "./pages/seller/ShopAllCoupouns";
import { ShopWithDrawMoneyPage } from "./pages/seller/ShopWithDrawMoneyPage";
import { ShopInboxPage } from "./pages/seller/ShopInboxPage";
import { PaymentPage } from "./pages/buyer/PaymentPage";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
              path="/payment"
              element={
                <BuyerProtectedRoute>
                  <PaymentPage />
                </BuyerProtectedRoute>
              }
            />
          <Route
            path="/checkout"
            element={
              <BuyerProtectedRoute>
                <CheckoutPage />
              </BuyerProtectedRoute>
            }
          />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/profile"
            element={
              <BuyerProtectedRoute>
                <ProfilePage />
              </BuyerProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <BuyerProtectedRoute>
                <UserInbox />
              </BuyerProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <BuyerProtectedRoute>
                <OrderDetailsPage />
              </BuyerProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <BuyerProtectedRoute>
                <TrackOrderPage />
              </BuyerProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          
          
          {/* shop routes */}
          <Route path="/shop-create" element={<ShopSignUpPage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupouns"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupouns />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
