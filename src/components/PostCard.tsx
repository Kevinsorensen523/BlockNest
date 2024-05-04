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
  IonModal,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import { heartOutline, chatbubblesOutline } from "ionicons/icons";
import React, { useState } from "react";
import { PostObj, User } from "./context/AuthContext";
import { close } from "ionicons/icons";

interface PostProps {
  post: PostObj;
  user: User;
}

const PostCard: React.FC<PostProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const likeHandler = () => {
    console.log(props.post.id);
  };

  const toggleModal = () => setShowModal(!showModal);
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
            src={`http://localhost/blocknest/${props.user.profile_pic}`}
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
      <IonRow className="ml-24 pr-24 grid">
        <IonLabel>{props.post.content}</IonLabel>
        <IonThumbnail
          className="mt-4 w-full max-w-48 h-auto"
          onClick={toggleModal}
        >
          <IonImg
            alt="Post Image"
            src={`http://localhost/blocknest/${props.post.image}`}
          />
        </IonThumbnail>
        <IonRow className="ion-align-items-start ion-justify-content-start mt-4">
          <IonButton fill="clear" color="danger" onClick={likeHandler}>
            <IonIcon slot="start" icon={heartOutline} />
            <IonLabel style={{ marginLeft: 10 }}>{props.post.likes}</IonLabel>
          </IonButton>

          <IonButton
            fill="clear"
            color="primary"
            routerLink={`/post/${props.post.id}`}
          >
            <IonIcon slot="start" icon={chatbubblesOutline} />
            <IonLabel style={{ marginLeft: 10 }}>
              {props.post.comments}
            </IonLabel>
          </IonButton>
        </IonRow>
      </IonRow>
      <IonModal isOpen={showModal} onDidDismiss={toggleModal}>
        <IonGrid>
          <IonRow className="ion-justify-content-end"></IonRow>
          <IonRow className="ion-justify-content-center">
            <IonImg
              alt="Full Image"
              src={`http://localhost/blocknest/${props.post.image}`}
            />
          </IonRow>
        </IonGrid>
      </IonModal>
    </>
  );
};

export default PostCard;
