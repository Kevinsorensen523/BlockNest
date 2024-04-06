import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonMenuToggle,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { home, heartOutline } from "ionicons/icons";
import React from "react";

const SideMenu: React.FC = () => {
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
                <IonLabel color="light">Dark Mode</IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default SideMenu;
