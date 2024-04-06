import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Search: React.FC = () => {
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
                <IonSearchbar
                  debounce={1}
                  onIonChange={handleSearchChange}
                  autocapitalize="none"
                ></IonSearchbar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonTitle className="ion-text-center mb-4">
                  Hot For You
                </IonTitle>
                <IonList>
                  {results.map((result, index) => (
                    <IonItem key={index}>{result}</IonItem>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Search;
