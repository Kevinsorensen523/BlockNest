import {
  IonAvatar,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import React from "react";
import { User } from "./context/AuthContext";
import { chatboxOutline, heartOutline } from "ionicons/icons";
import { PostObj } from "./context/AuthContext";

//interface Post { content: string, image: string };

/*interface PostProps {
  uName: string,
  rName: string,
  content: string,
  image: string,
  date: string
}*/

interface PostProps {
  post: PostObj,
  user: User
}

const PostCard2: React.FC<PostProps> = (props) => {
  const likeHandler = () => {
    console.log(props.post.id);
  };
  return (
    <>
    <IonGrid className="ml-24 pr-24">
      <IonRow>
        <IonCol>
        <IonRow>
          <IonItem style={{ "--background": "transparent" }} className="pt-1">
            <IonAvatar slot="start">
              <img
                alt="Silhouette of a person's head"
                src={`http://localhost/blocknest/${props.user.profile_pic}`}
              />
            </IonAvatar>
            <IonCol>
              <IonCardHeader>
                <IonCardTitle>{props.user.real_name}</IonCardTitle>
                <IonCardSubtitle>@{props.user.username}</IonCardSubtitle>
              </IonCardHeader>
            </IonCol>
          </IonItem>
        </IonRow>
        <IonRow className="ml-24 pr-24">
          <IonLabel>
            {props.post.content}
          </IonLabel>
        </IonRow>
        <IonRow className="ml-24 pr-24">
          <IonThumbnail className="mt-4 w-full max-w-48 h-auto">
            <img
              alt="Silhouette of mountains"
              src={`http://localhost/blocknest/${props.post.image}`}
            />
          </IonThumbnail>
        </IonRow>
        <IonRow className="ml-24 pr-24 center">
          <IonCol>
            <IonButton fill="clear" onClick={likeHandler}>
              <IonIcon icon={heartOutline} slot="icon-only"/>
            </IonButton>
            <IonLabel style={{marginLeft: 10}}>{props.post.likes}</IonLabel>
          </IonCol>
          <IonCol>
            <IonButton fill="clear" routerLink={`/post/${props.post.id}`}>
              <IonIcon icon={chatboxOutline} slot="icon-only"/>
            </IonButton>
            <IonLabel style={{marginLeft: 10}}>{props.post.comments}</IonLabel>
          </IonCol>
        </IonRow>
        </IonCol>
      </IonRow>
      </IonGrid>
    </>
  );
};

export default PostCard2;
