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

const Message: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonLabel>Ini Message</IonLabel>
      </IonPage>
    </>
  );
};

export default Message;
