// Notification.tsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonRow,
  IonItem,
  IonAvatar,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonIcon,
  IonGrid,
} from "@ionic/react";
import { chatbubblesOutline, heartOutline } from "ionicons/icons";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import axios, { AxiosResponse } from "axios";
import { PostObj } from "../../../components/context/AuthContext";
import PostCard from "../../../components/PostCard";

const NotificationCard = lazy(
  () => import("../../../components/NotificationCard")
);

const Notification: React.FC = () => {
  const url = "http://localhost:8000/home_page_posts.php";
  const [data, setData] = useState<AxiosResponse>();
  const [posts, setPosts] = useState<Array<PostObj>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(url).then((res) => {
      setData(res);
      console.log(res.data);
      setPosts(res.data.post);
    });
  };

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <Suspense fallback={<div>Loading posts...</div>}>
            <IonGrid>
              {posts.map((post, index) => (
                <NotificationCard key={index} post={post} user={post.user} />
                // Comment Your Post
                // Liked Your Post
                // Mention You in A Post
              ))}
            </IonGrid>
          </Suspense>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Notification;
