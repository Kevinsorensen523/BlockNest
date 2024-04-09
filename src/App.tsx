import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, mail, notifications, people, search } from "ionicons/icons";

import Home from "./pages/UserPages/Home/Home";
import Likes from "./pages/UserPages/Likes/Likes";
import Search from "./pages/UserPages/Search/Search";
import Community from "./pages/UserPages/Community/Community";
import Notification from "./pages/UserPages/Notification/Notification";
import Message from "./pages/UserPages/Message/Message";
import Profile from "./pages/UserPages/Profile/Profile";
import Login from "./pages/Authentication/Login/Login";
import { AuthProvider, useAuth } from "./components/context/AuthContext";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Route path="/login" render={() => <Login />} exact />
                <PrivateRoute path="/home" component={Home} exact />
                <PrivateRoute path="/likes" component={Likes} exact />
                <PrivateRoute path="/search" component={Search} exact />
                <PrivateRoute path="/community" component={Community} exact />
                <PrivateRoute
                  path="/notification"
                  component={Notification}
                  exact
                />
                <PrivateRoute path="/message" component={Message} exact />
                <PrivateRoute path="/profile" component={Profile} exact />
                <Route path="/" exact>
                  <Redirect to="/home" />
                </Route>
                <Route path="*">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="search" href="/search">
                <IonIcon icon={search} />
              </IonTabButton>
              <IonTabButton tab="community" href="/community">
                <IonIcon icon={people} />
              </IonTabButton>
              <IonTabButton tab="notification" href="/notification">
                <IonIcon icon={notifications} />
              </IonTabButton>
              <IonTabButton tab="message" href="/message">
                <IonIcon icon={mail} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  );
};

function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default App;
