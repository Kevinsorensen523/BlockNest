import { IonGrid, IonPage } from "@ionic/react";
import React from "react";
import PostCard from "../../../components/PostCard";
import { User } from "../../../components/context/AuthContext";
import PostCard2 from "../../../components/PostCard2";
import { PostObj } from "../../../components/context/AuthContext";

//interface Post { content: string, image: string };
interface MiniUser { username: string, full_name: string };

interface PostProps {
  posts: Array<PostObj>,
  user: User
}

const Posted: React.FC<PostProps> = (props) => {
  return (
    <>
      <IonGrid>
        {props.posts.map(post => (
          <PostCard2 post={post} user={props.user}/>
        ))}
      </IonGrid>
    </>
  );
};

export default Posted;
