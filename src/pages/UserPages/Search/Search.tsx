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
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Search: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonLabel>Ini Search</IonLabel>
      </IonPage>
    </>
  );
};

export default Search;
