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
  IonIcon,
} from "@ionic/react";
import { searchOutline, informationCircleOutline } from "ionicons/icons";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";

const Following: React.FC = () => {
  const data = [
    "Bitcoin Community",
    "Ethereum Community",
    "Solana Community",
    "Doge Community",
    "Manta Community",
    "Ondo Community",
    "Solidity Community",
  ];
  let [results, setResults] = useState([...data]);

  const handleSearchChange = (event: CustomEvent) => {
    const query = event.detail.value!.toLowerCase();
    setResults(data.filter((d) => d.toLowerCase().includes(query)));
  };

  const handleDetail = (item: string) => {
    console.log("View details for:", item);
    // Implement detail view functionality here
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
                    <IonRow key={index} style={{ alignItems: "center" }}>
                      <IonCol size="8">
                        <IonLabel>{result}</IonLabel>
                      </IonCol>
                      <IonCol size="4" className="ion-text-right">
                        <IonButton
                          onClick={() => handleDetail(result)}
                          fill="clear"
                        >
                          <IonIcon icon={informationCircleOutline} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonButton
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <span style={{ marginLeft: "5px" }}>Browse More</span>
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Following;
