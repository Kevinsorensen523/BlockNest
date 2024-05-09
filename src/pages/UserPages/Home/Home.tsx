import React, { useState, lazy, Suspense } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import RecomendedUserCard from "../../../components/RecomendedUserCard";
import RecomendedTagCard from "../../../components/RecomendedTagCard";

// Lazy load the ForYou and Following components
const Following = lazy(() => import("./Following"));
const ForYou = lazy(() => import("./ForYou"));

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
              <IonCol className="hidden xl:flex justify-center">
                <RecomendedUserCard />
              </IonCol>
              <IonCol size="12" size-md="8" size-xl="6">
                <Suspense fallback={<div>Loading...</div>}>
                  {selectedSegment === "ForYou" && <ForYou />}
                  {selectedSegment === "Following" && <Following />}
                </Suspense>
              </IonCol>
              <IonCol className="hidden sm:block xl:flex justify-center">
                <RecomendedTagCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
