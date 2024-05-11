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
import Home from "../Home/Home";
import RecomendedTagCard from "../../../components/RecomendedTagCard";
import RecomendedUserCard from "../../../components/RecomendedUserCard";

const PostCard = lazy(() => import("../../../components/PostCard"));

const Hashtag: React.FC = () => {
  const { hashtag } = useParams<{ hashtag: string }>();
  const url = "http://localhost:8000/hashtag_posts.php";
  const [posts, setPosts] = useState<Array<PostObj>>([]);

  useEffect(() => {
    getData();
  }, [hashtag]);

  const getData = () => {
    const formdata = new FormData();
    formdata.append("hashtag", `#${hashtag}`);
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
            Posts with #{hashtag}
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

export default Hashtag;
