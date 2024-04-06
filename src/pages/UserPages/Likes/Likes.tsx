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

const Likes: React.FC = () => {
  return (
    <>
      <IonMenu side="start" contentId="main-content" menuId="first">
        <IonHeader>
          <IonToolbar>
            <IonTitle>BlockNest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonMenuToggle auto-hide="false">
                  <IonButton routerLink="/home" fill="clear">
                    <IonIcon icon={home} slot="start" />
                    Home
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
              <IonCol size="12">
                <IonMenuToggle auto-hide="false">
                  <IonButton routerLink="/likes" fill="clear">
                    <IonIcon icon={heartOutline} slot="start" />
                    Like
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="bottom-0">
            <IonRow className="bg-blue-500 text-white text-center p-2">
              <IonCol>
                <IonLabel color="light">Untuk Profile</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="bg-green-500 text-white text-center p-2">
              <IonCol>
                <IonLabel color="light">Untuk Menu</IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton menu="first" autoHide={false}></IonMenuButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Blocknest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLabel>Ini Likes</IonLabel>
      </IonPage>
    </>
  );
};

export default Likes;
