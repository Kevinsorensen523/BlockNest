import React, { useState } from "react";
import "./../../../Global.css";
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNavLink,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Post from "./Posted";
import Liked from "./Liked";
import Home from "../Home/Home";
import Posted from "./Posted";

const Profile: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("Posted");
  const [isEdit, setIsEdit] = useState(false);

  const handleConfirm = () => {
    // Lakukan apa yang diperlukan ketika tombol Confirm diklik
    // Misalnya, simpan perubahan ke server atau lakukan validasi
    // Kemudian, tutup modal
    setIsEdit(false);
  };

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonNavLink routerDirection="forward" component={() => <Home />}>
              <IonButtons>
                <IonBackButton defaultHref="/home" />
              </IonButtons>
            </IonNavLink>
          </IonToolbar>
          <IonToolbar>
            <IonItem style={{ "--background": "transparent" }} className="pt-1">
              <IonAvatar slot="start">
                <img
                  width={100}
                  height={100}
                  alt="Silhouette of a person's head"
                  src="./public/profilesq.jpg"
                />
              </IonAvatar>
              <IonCol>
                <IonCardHeader>
                  <IonCardTitle>Leonardo</IonCardTitle>
                  <IonCardSubtitle>@leonardo1945</IonCardSubtitle>
                  <IonButton
                    className="max-w-28 oval-button"
                    onClick={() => setIsEdit(true)}
                    color="light"
                  >
                    Edit Profile
                  </IonButton>

                  <IonModal isOpen={isEdit} className="full-screen-modal ion-padding" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons slot="start">
                          <IonButton onClick={() => setIsEdit(false)}>
                            BACK
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" style={{ textAlign: "center" }}>
                      <IonAvatar>
                        <img
                          alt="Silhouette of a person's head"
                          src="/profilesq.jpg"
                        />
                      </IonAvatar>
                      <IonList>
                        <IonItem>
                          <IonInput
                            label="Full Name :"
                            value="Leonardo"
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Username :"
                            value="@leonardo1945"
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Email :"
                            value="leonardo@gmail.com"
                            disabled={true}
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Password :"
                            value="*****************"
                            disabled={true}
                          ></IonInput>
                        </IonItem>
                      </IonList>
                      <IonButton
                        className="ion-margin-top max-w-28 oval-button"
                        expand="block"
                        color="light"
                        onClick={() => handleConfirm()}
                      >
                        Confirm
                      </IonButton>
                    </IonContent>
                  </IonModal>
                </IonCardHeader>
              </IonCol>
            </IonItem>
            <IonRow className="ml-4 mb-4">
              <IonLabel>
                Passionate about Web 3 and blockchain projects, I'm deeply intrigued by the transformative potential they hold for the future.
              </IonLabel>
            </IonRow>
            <IonSegment
              color="dark"
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
            >
              <IonSegmentButton value="Posted">
                <IonLabel>Posted</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Liked">
                <IonLabel>Liked</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          <IonContent fullscreen>
            {selectedSegment === "Posted" && <Posted />}
            {selectedSegment === "Liked" && <Liked />}
          </IonContent>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default Profile;
