import React from "react";
import "./../../../Global.css";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Community: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Blocknest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLabel>Ini Komunitas</IonLabel>
      </IonPage>
    </>
  );
};

export default Community;
