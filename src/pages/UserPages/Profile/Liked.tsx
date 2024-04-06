import { IonGrid, IonPage } from "@ionic/react";
import React from "react";
import PostCard from "../../../components/PostCard";

const Liked: React.FC = () => {
  return (
    <>
      <IonGrid>
        <PostCard />
        <PostCard />
        <PostCard />
      </IonGrid>
    </>
  );
};

export default Liked;
