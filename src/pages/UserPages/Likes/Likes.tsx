import React from "react";
import "./../../../Global.css";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { home, heartOutline } from "ionicons/icons";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Likes: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonLabel>Ini Likes</IonLabel>
      </IonPage>
    </>
  );
};

export default Likes;
