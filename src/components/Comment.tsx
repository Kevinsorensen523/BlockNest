import {
  IonAvatar,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React from "react";
import { User } from "./context/AuthContext";
import { heartOutline } from "ionicons/icons";

interface CommentProps {
  user: User;
  content: string;
  date: string;
  likes: number;
}

const Comment: React.FC<CommentProps> = (props) => {
  return (
    <>
      <IonItem
        style={{ "--background": "transparent" }}
        className="pt-1"
        lines="none"
      >
        <IonAvatar slot="start">
          <img
            alt="Profile Picture"
            src={`http://blocknest.great-site.net/${props.user.profile_pic}`}
            className="w-10 h-10"
          />
        </IonAvatar>
        <IonCol>
          <IonCardHeader>
            <IonCardTitle>{props.user.real_name}</IonCardTitle>
            <IonCardSubtitle>@{props.user.username}</IonCardSubtitle>
          </IonCardHeader>
        </IonCol>
      </IonItem>
      <IonRow className="md:ml-24 md:pr-24 ml-6 pr-6 grid">
        <IonLabel>{props.content}</IonLabel>
        <IonRow className="ion-align-items-start ion-justify-content-start mt-4">
          <IonCol className="ion-no-padding">
            <IonLabel style={{ fontSize: 14, padding: 0, color: "grey" }}>
              Posted on {props.date}
            </IonLabel>
          </IonCol>
          <IonCol>
            <IonButton fill="clear" color="danger">
              <IonIcon slot="start" icon={heartOutline} />
              <IonLabel style={{ marginLeft: 10 }}>{props.likes}</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonRow>
    </>
  );
};

export default Comment;
