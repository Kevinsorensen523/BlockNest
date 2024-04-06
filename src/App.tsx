import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, mail, notifications, people, search } from "ionicons/icons";
import Home from "./pages/UserPages/Home/Home";
import Likes from "./pages/UserPages/Likes/Likes";

/* Core CSS required for Ionic components to work properly */
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
import Search from "./pages/UserPages/Search/Search";
import Community from "./pages/UserPages/Community/Community";
import Notification from "./pages/UserPages/Notification/Notification";
import Message from "./pages/UserPages/Message/Message";
import Profile from "./pages/UserPages/Profile/Profile";
import { useLocation } from "react-router-dom";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/likes" component={Likes} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/community" component={Community} />
            <Route exact path="/notification" component={Notification} />
            <Route exact path="/message" component={Message} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
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
  );
};

export default App;
