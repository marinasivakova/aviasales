import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./Components/App";
import tabReducer from "./Redux/tabReducer";
import filterReducer from "./Redux/filterReducer";
import clientReducer, { updateClient } from "./Redux/clientReducer";
import Client from "./Client/client";
import axios from "axios";
import buttonReducer from "./Redux/buttonReducer";

const store = configureStore({
  reducer: {
    tab: tabReducer,
    filter: filterReducer,
    client: clientReducer,
    button: buttonReducer,
  },
});

const getData = (id) => {
  Client(id)
    .then((r) => {
      store.dispatch(updateClient(r.data.tickets));
      if (r.data.stop) {
        return store
      } else {
        return getData(id);
      }
    })
    .catch(() => {
      return getData(id);
    });
};

const url = "https://aviasales-test-api.kata.academy/";
let id;
axios.get(url + "search").then((r) => {
  id = r.data.searchId;
  getData(id);
});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
