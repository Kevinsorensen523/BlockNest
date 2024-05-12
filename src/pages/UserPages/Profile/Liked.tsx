import { IonGrid, IonPage, useIonViewWillEnter } from "@ionic/react";
import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import {
  AuthContext,
  PostObj,
  User,
} from "../../../components/context/AuthContext";
import axios from "axios";

interface MiniUser {
  username: string;
  full_name: string;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const PostCard = lazy(() => import("../../../components/PostCard"));

const Liked: React.FC<PostProps> = (props) => {
  const authCtx = useContext(AuthContext);
  const url = "http://localhost:8000/liked_posts.php";
  const [posts, setPosts] = useState<Array<PostObj>>([]);

  useEffect(() => {
    getData();
  }, []);

  useIonViewWillEnter(() => {
    getData();
  });

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
      <Suspense fallback={<div>Loading posts...</div>}>
        <IonGrid className="2xl:px-40 2xl:mx-80 xl:px-16 xl:mx-80 lg:mx-72">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} user={post.user} />
          ))}
        </IonGrid>
      </Suspense>
    </>
  );
};

export default Liked;
