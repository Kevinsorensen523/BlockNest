import { defaults } from "chart.js";
import React from "react";
import PostCard from "../../../components/PostCard";
import { IonGrid } from "@ionic/react";

const Following: React.FC = () => {
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

export default Following;
