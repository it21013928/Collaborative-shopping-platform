import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
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

import App2 from "./dashboard/App";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import * as serviceWorker from "./serviceWorker";

store.dispatch(setProducts(products));

const container = document.getElementById("root");
const root = createRoot(container);
if (false) {
  root.render(
    <Provider store={store}>
      <PersistProvider>
        <App />
      </PersistProvider>
    </Provider>
  );
} else {
  root.render(
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <App2 />
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

serviceWorker.unregister();
