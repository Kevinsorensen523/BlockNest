// Likes.tsx
import React from "react";
import { IonContent, IonPage, IonRow, IonCol, IonGrid, IonIcon } from "@ionic/react";
import { heart } from "ionicons/icons";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Likes: React.FC = () => {
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
      
      <IonRow>
        <IonCol size="12">
          <div className="avatar-and-header">
            <div className="avatar">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                style={{ width: "50px" }} 
              />
            </div>
            <div className="header">
              <div className="name">Raphael Hutapea</div>
              <div className="username">@hutapea</div>
            </div>
          </div>
        </IonCol>
      </IonRow>

      
      <IonRow>
        <IonCol size="12">
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur purus ipsum, in dapibus velit sagittis in. Sed sodales, mi accumsan finibus porttitor, est leo maximus velit, et vestibulum odio augue sed risus. Pellentesque tempus lorem ac ultrices laoreet. Nulla id eleifend mi, sit amet suscipit nisi. Mauris sagittis vehicula libero quis lacinia. Maecenas rutrum tincidunt arcu non tincidunt. Morbi sed elit non elit pulvinar molestie.
          </div>
        </IonCol>
      </IonRow>

      
      <IonRow className="ion-align-items-center ion-justify-content-center mt-4">
        <IonCol size="12">
          <IonIcon icon={heart} style={{ fontSize: "24px", color: "red" }} />
        </IonCol>
      </IonRow>
    </>
  );
};

export default Likes;
