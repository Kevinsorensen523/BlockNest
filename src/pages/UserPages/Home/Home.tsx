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
import RecomendedCard from "../../../components/RecomendedCard";

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
              className="font-inknut lowercase text-xs"
            >
              <IonSegmentButton value="ForYou">
                <IonLabel className="text-xs">For You</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Following">
                <IonLabel className="text-xs">Following</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol className="hidden xl:flex justify-center ">
                <RecomendedCard />
              </IonCol>
              <IonCol size="12" size-md="8" size-xl="6">
                {selectedSegment === "ForYou" && <ForYou />}
                {selectedSegment === "Following" && <Following />}
              </IonCol>
              <IonCol className="hidden sm:block xl:flex justify-center">
                <RecomendedCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
