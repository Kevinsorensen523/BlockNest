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
import ChangePassword from "./pages/Authentication/ChangePassword/ChangePassword";
import Register from "./pages/Authentication/Register/Register";
import Post from "./pages/UserPages/Post/Post";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <ProtectedRoutes />
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/changePassword" component={ChangePassword} exact />
      {isAuthenticated ? (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/likes" component={Likes} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/community" component={Community} />
            <Route exact path="/notification" component={Notification} />
            <Route exact path="/message" component={Message} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/post" component={Post} />
            <Redirect exact from="/" to="/home" />
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
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

export default App;
