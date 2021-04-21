import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import ManageBilling from "./views/ManageBilling";
import ManageMachines from "./views/ManageMachines";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import { Provider } from "react-redux";
import store from "./store";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Provider  store={store}>
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/manage-billing" component={ManageBilling} />
            <Route path="/manage-machines" component={ManageMachines} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
    </Provider>
  );
};

export default App;