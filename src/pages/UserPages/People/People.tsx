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
import { useParams } from "react-router";

const People: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [selectedSegment, setSelectedSegment] = useState("Posted");
  const [isEdit, setIsEdit] = useState(false);
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);

  const uId = useParams<{ userId: string }>().userId;

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
    followers: 0,
    following: 0
  });

  const [isFollowed, setIsFollowed] = useState(0);

  const url = "http://localhost:8000/follow_user.php";
  const url2 = "http://localhost:8000/get_user_posts.php";

  useEffect(() => {
    getData();
    checkFollow();
  }, []);

  useIonViewWillEnter(() => {
    getData();
    checkFollow();
  });

  const getData = () => {
    const formdata = new FormData();
    const bla = uId.toString();
    formdata.append("user_id", bla as string);
    axios.post(url2, formdata).then((res) => {
      console.log(res.data);
      console.log(res.data.post);
      setPData(res);
      setPost(res.data.post);
      setMiniU(res.data.user_mini[0]);
    });
  };

  const checkFollow = () => {
    const formdata = new FormData();
    formdata.append("following_id", uId as string);
    formdata.append("follower_id", authCtx?.user.id.toString() as string);
    formdata.append("type", "check");
    axios.post(url, formdata).then((res) => {
      console.log(res.data.isFollowed);
      const iF = res.data.isFollowed;
      console.log("iF: " + iF);
      changeFollowStatus(iF);
    });
    console.log("isFollowed: " + isFollowed);
  };

  const changeFollowStatus = (iF: number) => {
    setIsFollowed(iF);
  }

  const handleFollow = () => {
    console.log(uId, authCtx?.user.id);
    if(uId !== authCtx?.user.id.toString()) {
      if(isFollowed == 0) {
        const formdata = new FormData();
        formdata.append("following_id", uId as string);
        formdata.append("follower_id", authCtx?.user.id.toString() as string);
        formdata.append("type", "follow");
        axios.post(url, formdata).then((res) => {
          setIsFollowed(res.data.isFollowed);
        });
        console.log(isFollowed);
      } else {
        const formdata = new FormData();
        formdata.append("following_id", uId as string);
        formdata.append("follower_id", authCtx?.user.id.toString() as string);
        formdata.append("type", "unfollow");
        axios.post(url, formdata).then((res) => {
          setIsFollowed(res.data.isFollowed);
        });
        console.log(isFollowed);
      }
    } else {
      console.log("You cannot follow yourself!");
    }
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
                    src={`http://localhost:8000/${miniU.profile_pic}`}
                    className="w-28 h-28 rounded-full"
                  />
                </IonCol>
                <IonCol className="-ml-4 sm:ml-0">
                  <IonCardHeader>
                    <IonCardTitle className="font-inknut sm:text-md text-sm">
                      {miniU.real_name}
                    </IonCardTitle>
                    <IonCardSubtitle className="font-inder text-md">
                      @{miniU.username} - {miniU.followers} followers - {miniU.following} following
                    </IonCardSubtitle>
                    <IonButton
                      className="mt-2 text-xs edit-button"
                      style={{
                        maxWidth: "150px",
                      }}
                      // color="light"
                      onClick={() => handleFollow()}
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
                  {miniU.bio}
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
