import React, { useContext, useEffect, useRef, useState } from "react";
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
  useIonViewWillEnter,
} from "@ionic/react";
import Post from "./Posted";
import Liked from "./Liked";
import Home from "../Home/Home";
import Posted from "./Posted";
import {
  AuthContext,
  User,
  useAuth,
} from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { PostObj } from "../../../components/context/AuthContext";

const Profile: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [selectedSegment, setSelectedSegment] = useState("Posted");
  const [isEdit, setIsEdit] = useState(false);

  const [editUname, setEditUname] = useState<string>(
    authCtx?.user.username as string
  );
  const [editFName, setEditFName] = useState<string>(
    authCtx?.user.real_name as string
  );
  const [editBio, setEditBio] = useState<string>(authCtx?.user.bio as string);

  const [pData, setPData] = useState<AxiosResponse>();
  const [posts, setPost] = useState<Array<PostObj>>([]);
  const [miniU, setMiniU] = useState<User>({
    id: 0,
    username: "ab",
    email: "ab",
    password: "ab",
    real_name: null,
    bio: null,
    profile_pic: null,
    posts: 0,
  });

  const url = "http://localhost/blocknest/update_user.php";
  const url2 = "http://localhost/blocknest/get_user_posts.php";

  useEffect(() => {
    getData();
    console.log(authCtx?.user.profile_pic);
  }, []);

  useIonViewWillEnter(() => {
    getData();
  });

  const getData = () => {
    const formdata = new FormData();
    const bla = authCtx?.user.id.toString();
    formdata.append("user_id", bla as string);
    axios.post(url2, formdata).then((res) => {
      console.log(res.data);
      console.log(res.data.post);
      setPData(res);
      setPost(res.data.post);
      setMiniU(res.data.user_mini[0]);
    });
  };

  const [profPic, setProfPic] = useState<File>();
  const changeProfilePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfPic(event.target!.files![0]);
  };
  const handleEditProfile = () => {
    const formData = new FormData();
    formData.append("user_id", authCtx?.user.id.toString() as string);
    formData.append("username", editUname);
    formData.append("full_name", editFName);
    formData.append("bio", editBio);
    formData.append("foto", profPic as File);
    axios.post(url, formData).then((res) => {
      console.log(res);
    });
    authCtx?.updateUser(
      editUname,
      editFName,
      editBio,
      "uploads/profile_pics/" + profPic?.name!
    );
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
            <IonItem
              style={{ "--background": "transparent" }}
              className="pt-1 "
            >
              <IonAvatar slot="start">
                <img
                  alt="Profile Picture"
                  src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}
                  className="w-full h-20"
                />
              </IonAvatar>
              <IonCol className="ml-20">
                <IonCardHeader>
                  <IonCardTitle>{authCtx?.user.real_name}</IonCardTitle>
                  <IonCardSubtitle>@{authCtx?.uName}</IonCardSubtitle>
                  <IonButton
                    className="max-w-28 oval-button"
                    onClick={() => setIsEdit(true)}
                    color="light"
                  >
                    Edit Profile
                  </IonButton>
                  <IonModal
                    isOpen={isEdit}
                    className="full-screen-modal ion-padding"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons slot="start">
                          <IonButton onClick={() => setIsEdit(false)}>
                            BACK
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent
                      className="ion-padding"
                      style={{ textAlign: "center" }}
                    >
                      <IonAvatar>
                        <img
                          alt="Profile Picture"
                          src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}
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

                        <IonItem>
                          <IonLabel>Profile Picture:</IonLabel>
                          <input type="file" onChange={changeProfilePic} />
                        </IonItem>
                      </IonList>
                      <IonButton
                        className="ion-margin-top max-w-28 oval-button"
                        expand="block"
                        color="light"
                        onClick={handleEditProfile}
                      >
                        Confirm
                      </IonButton>
                    </IonContent>
                  </IonModal>
                </IonCardHeader>
              </IonCol>
            </IonItem>
            <IonRow className="ml-4 mb-4">
              <IonLabel>{authCtx?.user.bio}</IonLabel>
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
            {selectedSegment === "Posted" && (
              <Posted posts={posts} user={miniU} />
            )}
            {selectedSegment === "Liked" && (
              <Liked posts={posts} user={miniU} />
            )}
          </IonContent>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default Profile;
