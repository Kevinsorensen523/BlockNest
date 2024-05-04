import { IonGrid, IonPage } from "@ionic/react";
import React from "react";
import PostCard from "../../../components/PostCard";
import { PostObj, User } from "../../../components/context/AuthContext";

interface MiniUser {
  username: string;
  full_name: string;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const Liked: React.FC<PostProps> = (props) => {
  return (
    <>
      <IonGrid>
        {props.posts.map((post) => (
          <PostCard post={post} user={props.user} />
        ))}
      </IonGrid>
    </>
  );
};

export default Liked;
