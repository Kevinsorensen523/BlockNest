import React, { useContext, useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonRow,
  IonThumbnail,
  IonToast,
} from "@ionic/react";
import {
  heartOutline,
  chatbubblesOutline,
  ellipsisVertical,
} from "ionicons/icons";
import { close } from "ionicons/icons";
import { AuthContext, PostObj, User } from "./context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router";

interface PostProps {
  post: PostObj;
  user: User;
  onDelete?: (postId: number) => void;
}

const NotificationCard: React.FC<PostProps> = (props) => {
  const history = useHistory();

  return (
    <>
      <IonItem
        style={{ "--background": "transparent", cursor: "pointer" }}
        className="pt-1"
      >
        <IonAvatar slot="start">
          <img
            alt="Profile Picture"
            src={`http://localhost:8000/${props.user.profile_pic}`}
            className="w-10 h-10 ml-4"
            onClick={() => history.push(`/people/${props.user.username}`)}
          />
        </IonAvatar>
        <IonCol>
          <IonCardHeader>
            <IonCardSubtitle
              onClick={() => history.push(`/people/${props.user.username}`)}
              className="font-inknut text-white"
            >
              @{props.user.username} Liked Your Post
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCol>
        <IonThumbnail>
          <IonImg
            alt="Post Image"
            src={`http://localhost:8000/${props.post.image}`}
          />
        </IonThumbnail>
      </IonItem>
    </>
  );
};

export default NotificationCard;
