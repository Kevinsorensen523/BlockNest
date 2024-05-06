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
      <IonGrid className="2xl:px-40 2xl:mx-80 xl:px-16 xl:mx-80 lg:mx-72">
        {props.posts.map((post) => (
          <PostCard post={post} user={props.user} />
        ))}
      </IonGrid>
    </>
  );
};

export default Liked;
