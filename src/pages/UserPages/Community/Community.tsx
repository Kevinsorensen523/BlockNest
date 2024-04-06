import React, { useState } from "react";
import "./../../../Global.css";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Community: React.FC = () => {
  const data = [
    "Bitcoin",
    "Ethereum",
    "Solana",
    "Doge",
    "Manta",
    "Ondo",
    "Solidity",
  ];
  let [results, setResults] = useState([...data]);

  const handleSearchChange = (event: CustomEvent) => {
    const query = event.detail.value!.toLowerCase();
    setResults(data.filter((d) => d.toLowerCase().includes(query)));
  };

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonTitle className="ion-text-center mb-4">
                  Join To Your Discussion Community
                </IonTitle>
                <IonList>
                  {results.map((result, index) => (
                    <IonRow>
                      <IonButton key={index}>{result}</IonButton>
                    </IonRow>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonButton>Browse More</IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Community;
