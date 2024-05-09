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
import Home from "../Home/Home";
import {
  AuthContext,
  User,
  useAuth,
} from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { PostObj } from "../../../components/context/AuthContext";
import { arrowDown, arrowUp, pencilOutline } from "ionicons/icons";
import Posted from "../Profile/Posted";

const People: React.FC = () => {
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

  const url = "http://localhost:8000/update_user.php";
  const url2 = "http://localhost:8000/get_user_posts.php";

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
              className={`max-w-28 roundedButton ${
                !isToolbarHidden ? "bounce" : ""
              }`}
              onClick={() => setIsToolbarHidden(!isToolbarHidden)}
              color="dark"
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
              <IonRow>
                <IonCol size="auto">
                  <img
                    alt="Profile Picture"
                    src={`http://localhost:8000/${authCtx?.user.profile_pic}`}
                    className="w-28 h-28 rounded-full"
                  />
                </IonCol>
                <IonCol className="-ml-4 sm:ml-0">
                  <IonCardHeader>
                    <IonCardTitle className="font-inknut sm:text-md text-sm">
                      {authCtx?.user.real_name}
                    </IonCardTitle>
                    <IonCardSubtitle className="font-inder text-md">
                      @{authCtx?.user.username}
                    </IonCardSubtitle>
                    <IonButton
                      className="mt-2 text-xs edit-button"
                      style={{
                        maxWidth: "150px",
                      }}
                      // color="light"
                      onClick={() => setIsEdit(true)}
                      size="large"
                      shape="round"
                    >
                      <IonLabel className="text-white"> Follow</IonLabel>
                    </IonButton>
                  </IonCardHeader>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonLabel className="font-abyssinica">
                  {authCtx?.user.bio}
                </IonLabel>
              </IonRow>
            </IonGrid>
            <hr className="separator-line" />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Posted posts={posts} user={miniU} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default People;
