import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonNavLink,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PostObj } from "../../../components/context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostCard = lazy(() => import("../../../components/PostCard"));

const ViewPost: React.FC = () => {
  const { notification } = useParams<{ notification: string }>();
  const url = "http://localhost:8000/view_posts.php";
  const [posts, setPosts] = useState<Array<PostObj>>([]);

  useEffect(() => {
    getData();
  }, [notification]);

  const getData = () => {
    const formdata = new FormData();
    formdata.append("notification", `${notification}`);
    axios
      .post(url, formdata)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.post);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className="font-bold font-inknut ion-text-center">
            View Post
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol className="hidden xl:flex justify-center"></IonCol>
            <IonCol size="12" size-md="8" size-xl="6">
              <Suspense fallback={<div>Loading posts...</div>}>
                <IonGrid>
                  {posts.map((post, index) => (
                    <PostCard key={index} post={post} user={post.user} />
                  ))}
                </IonGrid>
              </Suspense>
            </IonCol>
            <IonCol className="hidden sm:block xl:flex justify-center"></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewPost;
