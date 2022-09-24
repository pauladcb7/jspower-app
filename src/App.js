import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
            <Switch>
              <LoginRoute
                exact
                path="/login"
                name="Login Page"
                component={Login}
              />
              <LoginRoute
                exact
                path="/register"
                name="Register Page"
                component={Register}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <PrivateRoute path="/" name="Home" component={TheLayout} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </RootContext>
    );
  }
}

export default App;
