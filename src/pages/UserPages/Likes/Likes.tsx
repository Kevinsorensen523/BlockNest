import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { IonGrid, IonHeader, IonLabel, IonToolbar } from "@ionic/react";
import { AuthContext, PostObj } from "../../../components/context/AuthContext";
import axios from "axios";

const PostCard = lazy(() => import("../../../components/PostCard"));

const Likes: React.FC = () => {
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
      <IonHeader>
        <IonToolbar>
          <IonLabel>Test</IonLabel>
        </IonToolbar>
      </IonHeader>
      <Suspense fallback={<div>Loading posts...</div>}>
        <IonGrid>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} user={post.user} />
          ))}
        </IonGrid>
      </Suspense>
    </>
  );
};

export default Likes;
