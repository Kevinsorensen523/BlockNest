import React, { useContext, useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonToolbar,
  IonContent,
  IonPage,
  IonHeader,
  IonBackButton,
  IonNavLink,
} from "@ionic/react";
import { useParams } from "react-router";
import axios from "axios";
import {
  AuthContext,
  PostObj,
  User,
} from "../../../components/context/AuthContext";
import Posted from "../Profile/Posted";
import Home from "../Home/Home";
import { arrowDown, arrowUp } from "ionicons/icons";

const People: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const { username } = useParams<{ username: string }>();
  const [posts, setPosts] = useState<Array<PostObj>>([]);
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
    following: 0,
  });
  const [isFollowed, setIsFollowed] = useState(0);
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);

  const followUrl = "http://localhost:8000/follow_user.php";
  const userPostsUrl = "http://localhost:8000/get_user_posts.php";

  const fetchUserIdByUsername = async (
    username: string
  ): Promise<number | null> => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      const response = await axios.post(
        "http://localhost:8000/get_user_id.php",
        formData
      );
      if (response.data.success) {
        return response.data.user_id;
      }
      console.warn(response.data.message);
      return null;
    } catch (error) {
      console.error(`Error fetching user ID by username: ${error}`);
      return null;
    }
  };

  const fetchUserPostsById = async (userId: number) => {
    try {
      const formData = new FormData();
      formData.append("user_id", userId.toString());
      const response = await axios.post(userPostsUrl, formData);
      setPosts(response.data.post);
      setMiniU(response.data.user_mini[0]);
    } catch (error) {
      console.error(`Error fetching posts by user ID: ${error}`);
    }
  };

  const checkFollow = async (userId: number) => {
    try {
      const formData = new FormData();
      formData.append("following_id", userId.toString());
      formData.append("follower_id", authCtx?.user.id.toString() as string);
      formData.append("type", "check");
      const response = await axios.post(followUrl, formData);
      setIsFollowed(response.data.isFollowed);
    } catch (error) {
      console.error(`Error checking follow status: ${error}`);
    }
  };

  const handleFollow = async () => {
    if (miniU.id !== authCtx?.user.id) {
      const formData = new FormData();
      formData.append("following_id", miniU.id.toString());
      formData.append("follower_id", authCtx?.user.id.toString() as string);
      formData.append("type", isFollowed === 0 ? "follow" : "unfollow");
      try {
        const response = await axios.post(followUrl, formData);
        setIsFollowed(response.data.isFollowed);
        setMiniU((prev) => ({
          ...prev,
          followers: prev.followers + (isFollowed === 0 ? 1 : -1),
        }));
      } catch (error) {
        console.error(`Error following/unfollowing: ${error}`);
      }
    } else {
      console.log("You cannot follow yourself!");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserIdByUsername(username);
      if (userId !== null) {
        await fetchUserPostsById(userId);
        await checkFollow(userId);
      }
    };
    fetchUserData();
  }, [username]);

  return (
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
                    @{miniU.username} - {miniU.followers} followers -{" "}
                    {miniU.following} following
                  </IonCardSubtitle>
                  <IonButton
                    className="mt-2 text-xs edit-button"
                    onClick={handleFollow}
                    style={{
                      maxWidth: "150px",
                    }}
                    size="large"
                    shape="round"
                  >
                    <IonLabel className="text-white">
                      {isFollowed ? "Unfollow" : "Follow"}
                    </IonLabel>
                  </IonButton>
                </IonCardHeader>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonLabel className="font-abyssinica">{miniU.bio}</IonLabel>
            </IonRow>
          </IonGrid>
          <hr className="separator-line" />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Posted posts={posts} user={miniU} />
      </IonContent>
    </IonPage>
  );
};

export default People;
