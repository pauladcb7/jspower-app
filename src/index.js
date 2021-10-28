import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "core-js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ToastProvider } from "react-toast-notifications";
import { icons } from "./assets/icons";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store, { persistor } from "./store";

React.icons = icons;

window.localStorage.removeItem("add-to-homescreen-jspowerapp");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
