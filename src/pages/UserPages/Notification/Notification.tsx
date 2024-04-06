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
import Header from "../../../components/Header";
import SideMenu from "../../../components/SideMenu";

const Notification: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonLabel>Ini Notif</IonLabel>
      </IonPage>
    </>
  );
};

export default Notification;
