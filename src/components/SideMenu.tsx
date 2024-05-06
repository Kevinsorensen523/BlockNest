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
  IonToggle,
} from "@ionic/react";
import {
  home,
  heartOutline,
  add,
  addCircle,
  addCircleOutline,
} from "ionicons/icons";
import React from "react";

const SideMenu: React.FC = () => {
  return (
    <IonMenu side="start" contentId="main-content" menuId="first">
      <IonHeader>
        <IonToolbar>
          <IonTitle>BlockNest</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-flex ion-flex-column">
        <div className="ion-flex ion-flex-1 ion-flex-column">
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
              <IonCol size="12">
                <IonMenuToggle auto-hide="false">
                  <IonButton routerLink="/post" fill="clear">
                    <IonIcon icon={addCircleOutline} slot="start" />
                    Post
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <div className="bottom-0 absolute w-full">
          <IonGrid>
            <IonRow className="bg-blue-500 text-white text-center">
              <IonCol>
                <IonLabel color="light">Untuk Profile</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="bg-slate-500 text-white text-center">
              <IonCol>
                <IonToggle labelPlacement="start">Dark Mode</IonToggle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
