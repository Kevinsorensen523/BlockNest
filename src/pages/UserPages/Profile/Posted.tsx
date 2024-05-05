import { IonGrid, IonPage } from "@ionic/react";
import React from "react";
import PostCard from "../../../components/PostCard";
import { User } from "../../../components/context/AuthContext";
import { PostObj } from "../../../components/context/AuthContext";

//interface Post { content: string, image: string };
interface MiniUser {
  username: string;
  full_name: string;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const Posted: React.FC<PostProps> = (props) => {
  return (
    <>
      <IonGrid className="2xl:px-40 2xl:mx-80 xl:px-16 xl:mx-80 lg:mx-72">
        {props.posts.map((post) => (
          <PostCard post={post} user={props.user} />
        ))}
      </IonGrid>
    </>
  );
};

export default Posted;
