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
import Post from "./Post";
import Liked from "./Liked";
import Home from "../Home/Home";

const Profile: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("Post");
  const [isEdit, setIsEdit] = useState(false);

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
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              <IonCol>
                <IonCardHeader>
                  <IonCardTitle>Raphael Hutapea</IonCardTitle>
                  <IonCardSubtitle>@hutapea</IonCardSubtitle>
                  <IonButton
                    className="max-w-28"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </IonButton>
                  <IonModal isOpen={isEdit} className="full-screen-modal">
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons slot="start">
                          <IonButton onClick={() => setIsEdit(false)}>
                            BACK
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                      <IonAvatar>
                        <img
                          alt="Silhouette of a person's head"
                          src="https://ionicframework.com/docs/img/demos/avatar.svg"
                        />
                      </IonAvatar>
                      <IonList>
                        <IonItem>
                          <IonInput
                            label="Full Name :"
                            value="Aleron Hizkia Pratama Sorensen"
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Username :"
                            value="@aleronganteng123"
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Email :"
                            value="aleron123@gmail.com"
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
                    </IonContent>
                  </IonModal>
                </IonCardHeader>
              </IonCol>
            </IonItem>
            <IonRow className="ml-4 mb-4">
              <IonLabel>
                Namaku Andi Aku adalah seorang trilliuner, saya mendapat cuan
                hasil mining bitcoin sejak tahun 1945, saya menghold sebanyak
                100juta bitcoin
              </IonLabel>
            </IonRow>
            <IonSegment
              color="dark"
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
            >
              <IonSegmentButton value="Post">
                <IonLabel>Post</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Liked">
                <IonLabel>Liked</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          <IonContent fullscreen>
            {selectedSegment === "Post" && <Post />}
            {selectedSegment === "Liked" && <Liked />}
          </IonContent>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default Profile;
