//import { defaults } from "chart.js";
import React, { useEffect, useState } from "react";
import PostCard from "../../../components/PostCard";
import { IonGrid } from "@ionic/react";
import { PostObj } from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import PostCard2 from "../../../components/PostCard2";

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
    })
  }
  return (
    <>
      <IonGrid>
        {posts.map((post) => (
          <PostCard2 post={post} user={post.user} />
        ))}
      </IonGrid>
    </>
  );
};

export default ForYou;
