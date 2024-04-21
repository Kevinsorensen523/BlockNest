import React, { useContext, useRef, useState } from "react";
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
import { AuthContext, useAuth } from "../../../components/context/AuthContext";
import axios from "axios";

const Profile: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [selectedSegment, setSelectedSegment] = useState("Posted");
  const [isEdit, setIsEdit] = useState(false);

  const [editUname, setEditUname] = useState<string>(authCtx?.uName as string);
  const [editFName, setEditFName] = useState("");
  const [editBio, setEditBio] = useState("");

  const url = "http://localhost/blocknest/update_user.php";

  const handleEditProfile = () => {
    const formData = new FormData();
    formData.append('user_id', authCtx?.user.id.toString() as string);
    console.log(authCtx?.user.id.toString());
    formData.append('username', editUname);
    formData.append('full_name', editFName);
    formData.append('bio', editBio);
    axios.post(url, formData).then(res => {
      console.log(res);
    });
    authCtx?.updateUser(editUname, editFName, editBio);
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
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              <IonCol>
                <IonCardHeader>
                  <IonCardTitle>{authCtx?.user.real_name ? authCtx?.user.real_name : 'No Name'}</IonCardTitle>
                  <IonCardSubtitle>@{authCtx?.uName}</IonCardSubtitle>
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
                            value={editFName}
                            onIonChange={(e) => setEditFName(e.detail.value!)}
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Username :"
                            value={editUname}
                            onIonChange={(e) => setEditUname(e.detail.value!)}
                          ></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonInput
                            label="Email :"
                            value={authCtx?.user.email}
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

                        <IonItem>
                          <IonInput
                            label="Bio :"
                            value={editBio}
                            onIonChange={(e) => setEditBio(e.detail.value!)}
                          ></IonInput>
                        </IonItem>
                      </IonList>
                      <IonButton onClick={handleEditProfile}>Submit</IonButton>
                    </IonContent>
                  </IonModal>
                </IonCardHeader>
              </IonCol>
            </IonItem>
            <IonRow className="ml-4 mb-4">
              <IonLabel>
              {authCtx?.user.bio ? authCtx?.user.bio : 'About me...'}
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
