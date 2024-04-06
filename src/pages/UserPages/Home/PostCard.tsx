import {
  IonAvatar,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import React from "react";

const PostCard: React.FC = () => {
  return (
    <>
      <IonRow>
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
        <IonLabel className="ml-24 pr-24">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur purus ipsum, in dapibus velit sagittis in. Sed sodales, mi
          accumsan finibus porttitor, est leo maximus velit, et vestibulum odio
          augue sed risus. Pellentesque tempus lorem ac ultrices laoreet. Nulla
          id eleifend mi, sit amet suscipit nisi. Mauris sagittis vehicula
          libero quis lacinia. Maecenas rutrum tincidunt arcu non tincidunt.
          Morbi sed elit non elit pulvinar molestie.
        </IonLabel>
      </IonRow>
    </>
  );
};

export default PostCard;
