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

const Message: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Blocknest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLabel>Ini Message</IonLabel>
      </IonPage>
    </>
  );
};

export default Message;
