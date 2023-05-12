import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// shop page
const Shop = lazy(() => import("./pages/shop/Shop"));

// product page
const Product = lazy(() => import("./pages/shop-product/Product"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const Dashboard = lazy(() => import("./admin/pages/dashboardPage"));

const CreateUser = lazy(() => import("./admin/pages/createUserPage"));
const Customers = lazy(() => import("./admin/pages/customersPage"));
const Moderators = lazy(() => import("./admin/pages/moderatorsPage"));
const Sellers = lazy(() => import("./admin/pages/sellersPage"));
const PendingSellers = lazy(() => import("./admin/pages/pendingSellersPage"));

//Product
const ProductInput = lazy(() => import("./admin/pages/productInput"));
const ProductList = lazy(() => import("./admin/pages/productList"));
const ProductDetails = lazy(() => import("./admin/pages/productDetails"));

// Delivery

const ToBeDelivery = lazy(() => import("./admin/pages/toBeDeliveryPage"));
const ShippingDetails = lazy(() => import("./admin/pages/shippingDetailsPage"));
const ReceiveProduct = lazy(() => import("./admin/pages/receiveProductPage"));
const CheckProduct = lazy(() => import("./admin/pages/checkProductPage"));
const ShippedOrders = lazy(() => import("./admin/pages/shippedOrdersPage"));
const TrackOrder = lazy(() => import("./admin/pages/trackOrderPage"));
const RequestedProduct = lazy(() =>
  import("./admin/pages/requestedProductPage")
);
const RequestedProductList = lazy(() =>
  import("./admin/pages/requestedProductListPage")
);
const SalesHistory = lazy(() => import("./admin/pages/salesHistoryPage"));

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Routes>
            {/* Homepages */}
            <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
            {/* Shop pages */}
            <Route path={process.env.PUBLIC_URL + "/shop"} element={<Shop />} />
            {/* Shop product pages */}
            <Route
              path={process.env.PUBLIC_URL + "/product/:id"}
              element={<Product />}
            />
            {/* Other pages */}
            <Route
              path={process.env.PUBLIC_URL + "/about"}
              element={<About />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/my-account"}
              element={<MyAccount />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/login-register"}
              element={<LoginRegister />}
            />
            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
            <Route
              path={process.env.PUBLIC_URL + "/wishlist"}
              element={<Wishlist />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/compare"}
              element={<Compare />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />
            {/* ---------admin-------------- */}
            <Route
              path={process.env.PUBLIC_URL + "/dashboard"}
              element={<Dashboard />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/create-user"}
              element={<CreateUser />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/moderators"}
              element={<Moderators />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/sellers"}
              element={<Sellers />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/customers"}
              element={<Customers />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/seller-requests"}
              element={<PendingSellers />}
            />
            {/* Product Start*/}ProductView
            <Route
              path={process.env.PUBLIC_URL + "/productInput"}
              element={<ProductInput />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/productList"}
              element={<ProductList />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/productDetails/:id"}
              element={<ProductDetails />}
            />
            {/* Delivery Admin */}
            <Route
              path={process.env.PUBLIC_URL + "/toBeDelivery"}
              element={<ToBeDelivery />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/shippingDetails"}
              element={<ShippingDetails />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/receiveProduct"}
              element={<ReceiveProduct />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/checkProduct"}
              element={<CheckProduct />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/shippedOrders"}
              element={<ShippedOrders />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/trackOrder"}
              element={<TrackOrder />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/requestedProduct"}
              element={<RequestedProduct />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/requestedProductList"}
              element={<RequestedProductList />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/salesHistory"}
              element={<SalesHistory />}
            />
            {/* Product End*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
