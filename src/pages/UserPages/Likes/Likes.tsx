// Likes.tsx
import React from "react";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
} from "@ionic/react";
import { heart } from "ionicons/icons";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import { PostObj, User } from "../../../components/context/AuthContext";
import PostCard from "../../../components/PostCard";

interface MiniUser {
  username: string;
  full_name: string;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const Likes: React.FC<PostProps> = (props) => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        {/* <IonContent fullscreen>
          <IonGrid className="2xl:px-40 2xl:mx-80 xl:px-16 xl:mx-80 lg:mx-72">
            {props.posts.map((post) => (
              <PostCard post={post} user={props.user} />
            ))}
          </IonGrid>
        </IonContent> */}
      </IonPage>
    </>
  );
};

export default Likes;
