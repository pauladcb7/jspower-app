import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginRoute } from "./components/LoginRoutes";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./views/pages/login/Login";
import "./scss/style.scss";
import { RootContext } from "./contexts/RootContexts";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages

const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <RootContext>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Routes>
              <Route
                path="/login"
                element={
                  <LoginRoute>
                    <Login />
                  </LoginRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <LoginRoute>
                    <Register />
                  </LoginRoute>
                }
              />
              <Route path="/404" element={<Page404 />} />
              <Route path="/500" element={<Page500 />} />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <TheLayout />
                  </PrivateRoute>
                }
              />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </RootContext>
    );
  }
}

export default App;
