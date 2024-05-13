import React from "react";
import {
  IonAvatar,
  IonItem,
  IonCol,
  IonCardHeader,
  IonCardSubtitle,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router";

interface Interaction {
  post_image?: string;
  username: string;
  profile_pic: string;
  action_type: "like" | "comment" | "follow";
  created_at: string;
}

const NotificationCard: React.FC<Interaction> = ({
  post_image,
  username,
  profile_pic,
  action_type,
  created_at,
}) => {
  const history = useHistory();

  const actionLabel =
    action_type === "like"
      ? "liked your post"
      : action_type === "comment"
      ? "commented on your post"
      : "followed you";

  const basePath = "./../blocknest-backend/";

  return (
    <IonItem style={{ "--background": "transparent", cursor: "pointer" }}>
      <IonAvatar slot="start">
        <img
          alt="Profile Picture"
          src={`${basePath}${profile_pic}`}
          className="w-10 h-10 ml-4"
          onClick={() => history.push(`/people/${username}`)}
        />
      </IonAvatar>
      <IonCol>
        <IonCardHeader>
          <IonCardSubtitle onClick={() => history.push(`/people/${username}`)}>
            <strong>@{username}</strong> {actionLabel}
          </IonCardSubtitle>
          <IonCardSubtitle>{created_at}</IonCardSubtitle>
        </IonCardHeader>
      </IonCol>
      {post_image && action_type !== "follow" && (
        <IonThumbnail>
          <IonImg alt="Post Image" src={`${basePath}${post_image}`} />
        </IonThumbnail>
      )}
    </IonItem>
  );
};

export default NotificationCard;
