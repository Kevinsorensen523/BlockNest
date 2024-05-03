// Notification.tsx
import React from "react";
import { IonContent, IonPage, IonRow, IonItem, IonAvatar, IonCol, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel, IonThumbnail, IonButton, IonIcon, IonGrid } from "@ionic/react";
import { chatbubblesOutline, heartOutline } from "ionicons/icons"; 
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Notification: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <Post />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <Post />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <Post />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <Post />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

const Post: React.FC = () => {
  return (
    <>
      <IonItem style={{ "--background": "transparent" }} className="pt-1">
        <IonAvatar slot="start">
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <IonCol>
          <IonCardHeader>
            <IonCardTitle>Raphael Hutapea</IonCardTitle>
            <IonCardSubtitle>@hutapea</IonCardSubtitle>
          </IonCardHeader>
        </IonCol>
      </IonItem>
      <IonRow className="ml-24 pr-24">
        <IonLabel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur purus ipsum, in dapibus velit sagittis in. Sed sodales,
          mi accumsan finibus porttitor, est leo maximus velit, et vestibulum
          odio augue sed risus. Pellentesque tempus lorem ac ultrices laoreet.
          Nulla id eleifend mi, sit amet suscipit nisi. Mauris sagittis
          vehicula libero quis lacinia. Maecenas rutrum tincidunt arcu non
          tincidunt. Morbi sed elit non elit pulvinar molestie.
        </IonLabel>
        <IonThumbnail className="mt-4 w-full max-w-48 h-auto">
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
          />
        </IonThumbnail>
      </IonRow>
      <IonRow className="ion-align-items-center ion-justify-content-center mt-4">
        <IonButton fill="clear" color="primary">
          <IonIcon slot="start" icon={chatbubblesOutline} /> 
        </IonButton>
        <IonButton fill="clear" color="danger">
          <IonIcon slot="start" icon={heartOutline} /> 
        </IonButton>
      </IonRow>
    </>
  );
};

export default Notification;
