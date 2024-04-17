import React from "react";
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
} from "@ionic/react";

interface PostCardProps {
  content: string;
}

const PostCard: React.FC<PostCardProps> = ({ content }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem style={{ "--background": "transparent" }} className="pt-1">
            <IonAvatar slot="start">
              <img
                alt="Silhouette of a person's head"
                src="./public/profilesq.jpg"
              />
            </IonAvatar>
            <IonCardHeader>
              <IonCardTitle>Leonardo</IonCardTitle>
              <IonCardSubtitle>@leonardo1945</IonCardSubtitle>
            </IonCardHeader>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonLabel>{content}</IonLabel>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PostCard;
