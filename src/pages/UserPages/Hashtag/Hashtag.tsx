import React, { useEffect, useState, lazy, Suspense } from "react";
import { IonGrid, IonHeader, IonLabel, IonToolbar } from "@ionic/react";
import { PostObj } from "../../../components/context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <>
      <IonHeader>
        <IonToolbar>
          <IonLabel>Posts with #{hashtag}</IonLabel>
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

export default Hashtag;
