import React, { useEffect, useState, lazy, Suspense } from "react";
import { IonGrid } from "@ionic/react";
import { PostObj } from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";

// Lazy load the PostCard component
const PostCard = lazy(() => import("../../../components/PostCard"));

const ForYou: React.FC = () => {
  const url = "http://localhost/blocknest/home_page_posts.php";
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
    <Suspense fallback={<div>Loading posts...</div>}>
      <IonGrid>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} user={post.user} />
        ))}
      </IonGrid>
    </Suspense>
  );
};

export default ForYou;
