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
  IonGrid,
  IonHeader,
  IonIcon,
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
import "./Profile.css";
import { arrowDown, arrowUp, pencilOutline } from "ionicons/icons";

const Profile: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [selectedSegment, setSelectedSegment] = useState("Posted");
  const [isEdit, setIsEdit] = useState(false);
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);

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
            <IonButton
              className="max-w-28 roundedButton"
              onClick={() => setIsToolbarHidden(!isToolbarHidden)}
              color="primary"
              size="default"
              shape="round"
              style={{
                position: "fixed",
                bottom: "5px",
                right: "20px",
              }}
            >
              {isToolbarHidden ? (
                <IonIcon icon={arrowDown} />
              ) : (
                <IonIcon icon={arrowUp} />
              )}
            </IonButton>
          </IonToolbar>
          <IonToolbar style={{ display: isToolbarHidden ? "none" : "flex" }}>
            <IonGrid className="md:ml-20 ml-6">
              <IonRow className="mb-6">
                <IonCol size="auto">
                  <img
                    alt="Profile Picture"
                    src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}
                    className="w-28 h-28 rounded-full"
                  />
                </IonCol>
                <IonCol>
                  <IonCardHeader>
                    <IonCardTitle>{authCtx?.user.real_name}</IonCardTitle>
                    <IonCardSubtitle>@{authCtx?.user.username}</IonCardSubtitle>
                    <IonButton
                      className="max-w-28 roundedButton"
                      onClick={() => setIsEdit(true)}
                      color="primary"
                      size="default"
                      shape="round"
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
                        <IonGrid className="center-grid">
                          <IonRow>
                            <IonAvatar className="mb-28 mt-4 w-36 mx-auto">
                              <img
                                alt="Profile Picture"
                                src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}
                                className="flex"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={changeProfilePic} // Panggil fungsi changeProfilePic saat gambar dipilih
                                className="edit-icon z-10" // Terapkan gaya yang sesuai untuk input yang tersembunyi
                                style={{ opacity: 0, position: "absolute" }} // Sembunyikan input dan posisikan di atas tombol edit
                              />
                              <IonButton
                                className="edit-icon z-10"
                                onClick={() => {
                                  const inputElement =
                                    document.getElementById(
                                      "profile-pic-input"
                                    );
                                  if (inputElement) {
                                    inputElement.click(); // Klik input secara otomatis saat tombol edit di dalam avatar diklik
                                  }
                                }}
                                color="light"
                                size="small"
                              >
                                <IonIcon icon={pencilOutline} />
                              </IonButton>
                            </IonAvatar>
                          </IonRow>
                          <IonRow>
                            <div className="login-form  md:py-10 py-12">
                              <IonRow>
                                <IonCol className="mt-4">
                                  <IonLabel position="floating">
                                    Username:
                                  </IonLabel>
                                </IonCol>
                                <IonCol>
                                  <IonItem
                                    lines="inset"
                                    className="roundedInput md:w-96 w-64"
                                  >
                                    <IonInput placeholder="please insert your username"></IonInput>
                                  </IonItem>
                                </IonCol>
                              </IonRow>
                              <IonRow>
                                <IonCol className="mt-4">
                                  <IonLabel position="floating">
                                    Username:
                                  </IonLabel>
                                </IonCol>
                                <IonCol>
                                  <IonItem
                                    lines="inset"
                                    className="roundedInput md:w-96 w-64"
                                  >
                                    <IonInput placeholder="please insert your username"></IonInput>
                                  </IonItem>
                                </IonCol>
                              </IonRow>
                              <IonRow>
                                <IonCol className="mt-4">
                                  <IonLabel position="floating">
                                    Username:
                                  </IonLabel>
                                </IonCol>
                                <IonCol>
                                  <IonItem
                                    lines="inset"
                                    className="roundedInput md:w-96 w-64"
                                  >
                                    <IonInput placeholder="please insert your username"></IonInput>
                                  </IonItem>
                                </IonCol>
                              </IonRow>
                              <IonRow>
                                <IonCol className="mt-4">
                                  <IonLabel position="floating">
                                    Username:
                                  </IonLabel>
                                </IonCol>
                                <IonCol>
                                  <IonItem
                                    lines="inset"
                                    className="roundedInput md:w-96 w-64"
                                  >
                                    <IonInput placeholder="please insert your username"></IonInput>
                                  </IonItem>
                                </IonCol>
                              </IonRow>

                              {/* <IonList lines="none">
                              <IonItem>
                                <IonInput
                                  label="Full Name :"
                                  value={editFName}
                                  onIonChange={(e) =>
                                    setEditFName(e.detail.value!)
                                  }
                                ></IonInput>
                              </IonItem>

                              <IonItem>
                                <IonInput
                                  label="Username :"
                                  value={editUname}
                                  onIonChange={(e) =>
                                    setEditUname(e.detail.value!)
                                  }
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
                                  onIonChange={(e) =>
                                    setEditBio(e.detail.value!)
                                  }
                                ></IonInput>
                              </IonItem>

                              <IonItem>
                                <IonLabel>Profile Picture:</IonLabel>
                                <input
                                  type="file"
                                  onChange={changeProfilePic}
                                />
                              </IonItem>
                            </IonList> */}
                              <IonButton
                                className="ion-margin-top max-w-28 oval-button mx-auto"
                                expand="block"
                                color="light"
                                shape="round"
                                onClick={handleEditProfile}
                              >
                                Confirm
                              </IonButton>
                            </div>
                          </IonRow>
                        </IonGrid>
                      </IonContent>
                    </IonModal>
                  </IonCardHeader>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonLabel>{authCtx?.user.bio}</IonLabel>
              </IonRow>
            </IonGrid>
          </IonToolbar>
          <IonToolbar>
            <hr className="separator-line" />
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
        </IonHeader>
        <IonContent>
          {selectedSegment === "Posted" && (
            <Posted posts={posts} user={miniU} />
          )}
          {selectedSegment === "Liked" && <Liked posts={posts} user={miniU} />}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Profile;
