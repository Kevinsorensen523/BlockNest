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
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Search: React.FC = () => {
  const data = [
    { name: "Bitcoin", logo: "bitcoin-logo.png" },
    { name: "Ethereum", logo: "ethereum-logo.png" },
    { name: "Solana", logo: "solana-logo.png" },
    { name: "Doge", logo: "doge-logo.png" },
    { name: "Manta", logo: "manta-logo.png" },
    { name: "Ondo", logo: "ondo-logo.png" },
    { name: "Solidity", logo: "solidity-logo.png" },
  ];
  let [results, setResults] = useState([...data]);

  const handleSearchChange = (event: CustomEvent) => {
    const query = event.detail.value!.toLowerCase();
    setResults(data.filter((d) => d.name.toLowerCase().includes(query)));
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
                  className="roundedBar"
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
                    <IonItem key={index}>
                      <IonIcon slot="start" icon="search-outline" />
                      <IonLabel>{result.name}</IonLabel>
                      <img
                        slot="end"
                        src={result.logo}
                        alt={result.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginLeft: "10px",
                        }}
                      />
                    </IonItem>
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
