import React from "react";
import "./../../../Global.css";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Profile: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Blocknest</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default Profile;
