import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import {
  AuthContext,
  PostObj,
  User,
} from "../../../components/context/AuthContext";
import axios from "axios";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import RecomendedUserCard from "../../../components/RecomendedUserCard";
import RecomendedTagCard from "../../../components/RecomendedTagCard";

interface MiniUser {
  username: string;
  full_name: string;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const PostCard = lazy(() => import("../../../components/PostCard"));

const Likes: React.FC<PostProps> = (props) => {
  const authCtx = useContext(AuthContext);
  const url = "http://localhost:8000/liked_posts.php";
  const [posts, setPosts] = useState<Array<PostObj>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const formdata = new FormData();
    formdata.append("user_id", authCtx?.user.id.toString() as string);
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
    <>
      <SideMenu />
      <IonPage id="main-content">
        <IonHeader>
          <Header />
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol className="hidden xl:flex justify-center">
                <RecomendedUserCard />
              </IonCol>
              <IonCol size="12" size-md="8" size-xl="6">
                <Suspense fallback={<div>Loading posts...</div>}>
                  <IonGrid>
                    {posts.map((post, index) => (
                      <PostCard key={index} post={post} user={post.user} />
                    ))}
                  </IonGrid>
                </Suspense>
              </IonCol>
              <IonCol className="hidden sm:block xl:flex justify-center">
                <RecomendedTagCard />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Likes;
