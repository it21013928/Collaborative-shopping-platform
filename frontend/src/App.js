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
const Calendar = lazy(() => import("./admin/pages/calendarPage"));

const Form = lazy(() => import("./admin/pages/formPage"));
const Contacts = lazy(() => import("./admin/pages/contactsPage"));
const Invoices = lazy(() => import("./admin/pages/invoicesPage"));
const Faq = lazy(() => import("./admin/pages/faqPage"));
const Team = lazy(() => import("./admin/pages/teamPage"));

const Customers = lazy(() => import("./admin/pages/customersPage"));
const Moderators = lazy(() => import("./admin/pages/moderatorsPage"));
const Sellers = lazy(() => import("./admin/pages/sellersPage"));

const Tracking = lazy(() => import("./admin/pages/tracking"));

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
              path={process.env.PUBLIC_URL + "/calendar"}
              element={<Calendar />}
            />

            <Route path={process.env.PUBLIC_URL + "/team"} element={<Team />} />

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
              path={process.env.PUBLIC_URL + "/contacts"}
              element={<Contacts />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/invoices"}
              element={<Invoices />}
            />

            <Route path={process.env.PUBLIC_URL + "/form"} element={<Form />} />

            <Route path={process.env.PUBLIC_URL + "/faq"} element={<Faq />} />

            <Route
              path={process.env.PUBLIC_URL + "/tracking"}
              element={<Tracking />}
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

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
