import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import CreateReservation from "./views/CreateReservation";
import ManageBilling from "./views/ManageBilling";
import ManageMachines from "./views/ManageMachines";
import ManageReservations from "./views/ManageReservations";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./store";
import config from "./auth_config.json";
import HttpsRedirect from 'react-https-redirect';

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

const App = () => {
  const { isLoading, error, user, getAccessTokenSilently, logout } = useAuth0();

  if (error) {
    return (
      <div>
      <h1>ERROR: You do not have access to this application.</h1>
      <p>Ensure that you are using your uidaho.edu email</p>
      <p>If you are using your uidaho.edu email please complete the verification steps sent to your email</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Click to logout</button>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Provider  store={store}>
    <HttpsRedirect>
    <HashRouter history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/create-reservation" component={CreateReservation} />
            <Route path="/manage-billing" component={ManageBilling} />
            <Route path="/manage-machines" component={ManageMachines} />
            <Route path="/manage-reservations" component={ManageReservations} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </HashRouter>
    </HttpsRedirect>
    </Provider>
  );
};

export default App;
