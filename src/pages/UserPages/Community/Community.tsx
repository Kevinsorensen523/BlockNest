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
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Community: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonLabel>Ini Komunitas</IonLabel>
      </IonPage>
    </>
  );
};

export default Community;
