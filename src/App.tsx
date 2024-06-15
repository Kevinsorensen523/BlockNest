import React, { useContext, useEffect, useState } from "react";
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
import {
  addCircle,
  addOutline,
  home,
  mail,
  notifications,
  people,
  person,
  personOutline,
  search,
} from "ionicons/icons";

import Home from "./pages/UserPages/Home/Home";
import Likes from "./pages/UserPages/Likes/Likes";
import Search from "./pages/UserPages/Search/Search";
import Community from "./pages/UserPages/Community/Community";
import Notification from "./pages/UserPages/Notification/Notification";
import Message from "./pages/UserPages/Message/Message";
import Profile from "./pages/UserPages/Profile/Profile";
import Login from "./pages/Authentication/Login/Login";
import {
  AuthContext,
  AuthProvider,
  useAuth,
} from "./components/context/AuthContext";

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
import Comments from "./pages/UserPages/Post/Comments";
import Hashtag from "./pages/UserPages/Hashtag/Hashtag";
import People from "./pages/UserPages/People/People";
import "./App.css";
import EditPost from "./pages/UserPages/Post/EditPost";
import ViewPost from "./pages/UserPages/Post/ViewPost";
import axios from "axios";

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
  const { user } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);

  React.useEffect(() => {
    if (user && user.id) {
      axios
        .get(
          `http://blocknest.great-site.net/api/notifications/count?user_id=${user.id}`
        )
        .then((response) => {
          setNotificationCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching notification count", error);
        });
    }
  }, [user]);

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
            <Route exact path="/search/:search" component={Search} />
            {/* <Route exact path="/community" component={Community} /> */}
            <Route exact path="/notification" component={Notification} />
            {/* <Route exact path="/message" component={Message} /> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/hashtag/:hashtag" component={Hashtag} />
            <Route exact path="/people/:username" component={People} />
            <Route exact path="/post" component={Post} />
            <Route path="/post/:postId" component={Comments} />
            <Route path="/edit/:postId" component={EditPost} />
            <Route path="/viewpost/:notification" component={ViewPost} />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="main-bar">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon icon={search} />
            </IonTabButton>
            <IonTabButton tab="post" href="/post">
              <IonIcon icon={addOutline} />
            </IonTabButton>
            {/* <IonTabButton tab="community" href="/community">
              <IonIcon icon={people} />
            </IonTabButton> */}
            <IonTabButton tab="notification" href="/notification">
              <IonIcon icon={notifications} />
              {notificationCount > 0 && (
                <div className="absolute top-0 right-0 mt-1 mr-2 rounded-full bg-red-500 w-2 h-2"></div>
              )}
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={person} />
            </IonTabButton>
            {/* <IonTabButton tab="message" href="/message">
              <IonIcon icon={mail} />
            </IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

export default App;
