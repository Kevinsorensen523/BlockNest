import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import PostCard from "../../../components/PostCard";

const ForYou: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <PostCard />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <PostCard />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <PostCard />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <PostCard />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <PostCard />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <PostCard />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ForYou;
