import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonPage,
  IonRow,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  AuthContext,
  PostObj,
  User,
} from "../../../components/context/AuthContext";

const Hastag: React.FC = () => {
  return (
    <IonPage>
      <IonLabel>Ini Hastag ngab</IonLabel>
    </IonPage>
  );
};

export default Hastag;
