import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import PostCard from "../../../components/PostCard";

const Posted: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <PostCard
            content="I Believe sometimes crypto can replace fiat!!!"
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <PostCard
            content="BTC will reach new ATH soon!!"
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <PostCard
            content="Blockchain is magical of internet!!!"
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Posted;
