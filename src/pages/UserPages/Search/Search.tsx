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

const Search: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Blocknest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLabel>Ini Search</IonLabel>
      </IonPage>
    </>
  );
};

export default Search;
