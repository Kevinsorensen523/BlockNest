import { defaults } from "chart.js";
import React from "react";
import PostCard from "../../../components/PostCard";
import { IonGrid } from "@ionic/react";

const ForYou: React.FC = () => {
  return (
    <>
      <IonGrid>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </IonGrid>
    </>
  );
};

export default ForYou;
