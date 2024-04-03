import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import ExploreContainer from "../../../components/ExploreContainer";
import "./Home.css";
import Following from "./Following";
import ForYou from "./ForYou";

const Home: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("ForYou");

  return (
    <>
      <IonMenu>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BlockNest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="ion-text-center mt-4">Blocknest</IonTitle>
          </IonToolbar>
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
