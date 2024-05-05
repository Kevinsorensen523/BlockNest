//import { defaults } from "chart.js";
import React, { useEffect, useState } from "react";
import PostCard from "../../../components/PostCard";
import { IonGrid } from "@ionic/react";
import { PostObj } from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";

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
    <>
      <IonGrid className="2xl:px-40 2xl:mx-80 xl:px-16 xl:mx-80 lg:mx-72">
        {posts.map((post) => (
          <PostCard post={post} user={post.user} />
        ))}
      </IonGrid>
    </>
  );
};

export default ForYou;
