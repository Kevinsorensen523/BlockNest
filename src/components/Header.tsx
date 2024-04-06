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
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { home, heartOutline } from "ionicons/icons";
import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton menu="first" autoHide={false}></IonMenuButton>
        </IonButtons>
        <IonTitle className="ion-text-center">Blocknest</IonTitle>
      </IonToolbar>
    </>
  );
};

export default Header;
