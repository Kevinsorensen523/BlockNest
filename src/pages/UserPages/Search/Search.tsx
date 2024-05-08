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
import { useHistory } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import { searchOutline } from "ionicons/icons";
import "./Search.css";
import "./../../../Global.css";

const Search: React.FC = () => {
  const initialData = [
    { name: "Bitcoin", logo: "bitcoin-logo.png" },
    { name: "Ethereum", logo: "ethereum-logo.png" },
    { name: "Solana", logo: "solana-logo.png" },
    { name: "Doge", logo: "doge-logo.png" },
    { name: "Manta", logo: "manta-logo.png" },
    { name: "Ondo", logo: "ondo-logo.png" },
    { name: "Solidity", logo: "solidity-logo.png" },
  ];
  const [results, setResults] = useState([...initialData]);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearchChange = (event: CustomEvent) => {
    const query = event.detail.value || "";
    setSearchQuery(query);
    const filteredResults = initialData.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleItemClick = (itemName: string) => {
    history.push(`/search/${itemName}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      history.push(`/search/${searchQuery}`);
    }
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
                  onKeyPress={handleKeyPress}
                  autocapitalize="none"
                  className="rounded-bar"
                ></IonSearchbar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonTitle className="ion-text-center mt-4 text-md">
                  Hot For You
                </IonTitle>
                <IonList className="bg-black">
                  {results.map((result, index) => (
                    <IonItem
                      key={index}
                      button
                      onClick={() => handleItemClick(result.name)}
                      className="mt-0.5"
                    >
                      <IonIcon
                        slot="end"
                        icon={searchOutline}
                        className="text-white"
                      />
                      <IonTitle className="font-josefin text-md">
                        {result.name}
                      </IonTitle>
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
