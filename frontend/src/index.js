import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import AdminApp from "./AdminApp";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { setProducts } from "./store/slices/product-slice";
import products from "./data/products.json";
import "animate.css";
import "swiper/swiper-bundle.min.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

function getApp() {
  store.dispatch(setProducts(products));

  const container = document.getElementById("root");
  const root = createRoot(container);

  const urlParams = new URLSearchParams(window.location.search);
  const appType = urlParams.get("access");

  if (appType === "admin") {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <AdminApp />
        </BrowserRouter>
      </React.StrictMode>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistProvider>
          <App />
        </PersistProvider>
      </Provider>
    );
  }
}

ReactDOM.render(getApp(), document.getElementById("root"));

// store.dispatch(setProducts(products));

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//     <Provider store={store}>
//       <PersistProvider>
//         <App />
//       </PersistProvider>
//     </Provider>
// );
