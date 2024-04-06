import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonMenuToggle,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import { home, heartOutline } from "ionicons/icons";
import Following from "./Following";
import ForYou from "./ForYou";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Home: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("ForYou");

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <IonHeader>
          <Header />
          <IonToolbar>
            <IonSegment
              color="dark"
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
            >
              <IonSegmentButton value="ForYou">
                <IonLabel>For You</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Following">
                <IonLabel>Following</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {selectedSegment === "ForYou" && <ForYou />}
          {selectedSegment === "Following" && <Following />}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
