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
          <IonTitle className="font-inknut font-bold">BlockNest</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-flex ion-flex-column">
        <div className="ion-flex ion-flex-1 ion-flex-column ">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonMenuToggle auto-hide="false">
                  <IonButton routerLink="/home" fill="clear">
                    <IonIcon icon={home} slot="start" className="text-white" />
                    <IonLabel className="mx-2 mt-1 font-inknut capitalize text-white">
                      Home
                    </IonLabel>
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
              <IonCol size="12">
                <IonMenuToggle auto-hide="false">
                  <IonButton routerLink="/likes" fill="clear">
                    <IonIcon
                      icon={heartOutline}
                      slot="start"
                      className="text-white"
                    />
                    <IonLabel className="mx-2 mt-1 font-inknut capitalize text-white">
                      Like
                    </IonLabel>
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
              <IonCol size="12">
                <IonMenuToggle auto-hide="false">
                  <IonButton routerLink="/post" fill="clear">
                    <IonIcon
                      icon={addCircleOutline}
                      slot="start"
                      className="text-white"
                    />
                    <IonLabel className="mx-2 mt-1 font-inknut capitalize text-white">
                      Post
                    </IonLabel>
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <div className="-bottom-1 -left-1 fixed w-80">
          <IonGrid>
            <IonRow className="bg-[#0A0A0A] text-white text-center h-10 items-center">
              <IonCol>
                {/* <IonToggle labelPlacement="start">Dark Mode</IonToggle> */}
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
