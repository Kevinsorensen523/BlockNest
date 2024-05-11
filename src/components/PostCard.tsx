import React, { useContext, useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonRow,
  IonThumbnail,
  IonToast,
  IonAlert,
} from "@ionic/react";
import {
  heartOutline,
  chatbubblesOutline,
  ellipsisVertical,
  heart,
} from "ionicons/icons";
import { close } from "ionicons/icons";
import { AuthContext, PostObj, User } from "./context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router";

interface PostProps {
  post: PostObj;
  user: User;
  onDelete?: (postId: number) => void;
}

const PostCard: React.FC<PostProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [likes, setLikes] = useState(props.post.likes);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const url = "http://localhost:8000/like_post.php";
  const deleteUrl = "http://localhost:8000/delete_post.php";

  const fetchUserIdByUsername = async (username: string) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      const response = await axios.post(
        "http://localhost:8000/get_user_id.php",
        formData
      );

      if (response.data.success) {
        return response.data.user_id;
      } else {
        console.warn(`Unable to find user ID for username: ${username}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching user ID: ${error}`);
      return null;
    }
  };

  const handleMentionClick = async (username: string) => {
    const userId = await fetchUserIdByUsername(username);
    if (userId !== null) {
      if (authCtx?.user.username === username) {
        history.push("/profile");
      } else {
        history.push(`/people/${username}`);
      }
    }
  };

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("post_id", props.post.id.toString() as string);
    formdata.append("user_id", authCtx?.user.id.toString() as string);
    formdata.append("type", "check");
    axios.post(url, formdata).then((res) => {
      setIsLiked(res.data.isLiked === 1);
    });
  }, [props.post.id, authCtx?.user.id, url]);

  const likeHandler = () => {
    const formdata = new FormData();
    formdata.append("post_id", props.post.id.toString() as string);
    formdata.append("user_id", authCtx?.user.id.toString() as string);
    formdata.append("type", isLiked ? "unlike" : "like");
    axios.post(url, formdata).then((res) => {
      if (res.data.success) {
        setIsLiked(res.data.isLiked === 1);
        setLikes((prevLikes) => prevLikes + (res.data.isLiked === 1 ? 1 : -1));
      }
    });
  };

  const toggleModal = () => setShowModal(!showModal);

  const navigateToUserProfileByUsername = (username: string) => {
    if (authCtx?.user.username === username) {
      history.push("/profile");
    } else {
      history.push(`/people/${username}`);
    }
  };

  const renderPostContent = (content: string) => {
    return (
      <div>
        {content.split(" ").map((word, index) => {
          if (word.startsWith("#")) {
            return (
              <span
                key={index}
                style={{ color: "#7cd3f8", cursor: "pointer" }}
                onClick={() => history.push(`/hashtag/${word.substring(1)}`)}
              >
                {word}{" "}
              </span>
            );
          } else if (word.startsWith("@")) {
            const username = word.substring(1);
            return (
              <span
                key={index}
                style={{ color: "#7cd3f8", cursor: "pointer" }}
                onClick={() => handleMentionClick(username)}
              >
                {word}{" "}
              </span>
            );
          } else {
            return word + " ";
          }
        })}
      </div>
    );
  };

  const handleEditClick = () => {
    setShowPopover(false);
  };

  const confirmDeletePost = async () => {
    const formData = new FormData();
    formData.append("post_id", props.post.id.toString());

    try {
      const response = await axios.post(deleteUrl, formData);
      if (response.data.success) {
        setToastMessage("Post deleted successfully.");
        props.onDelete?.(props.post.id);
        window.location.reload(); // Reload seluruh halaman
      } else {
        setToastMessage(response.data.message || "Unable to delete the post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setToastMessage("Error deleting post. Try again later.");
    }

    setShowToast(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    setShowPopover(false);
  };

  const handleShareClick = () => {
    setShowPopover(false);
  };

  const handleReportClick = () => {
    setShowPopover(false);
  };

  return (
    <>
      <IonItem
        style={{ "--background": "transparent", cursor: "pointer" }}
        className="pt-1"
        lines="none"
      >
        <IonAvatar slot="start">
          <img
            alt="Profile Picture"
            src={`http://localhost:8000/${props.user.profile_pic}`}
            className="w-10 h-10 ml-4"
            onClick={() => navigateToUserProfileByUsername(props.user.username)}
          />
        </IonAvatar>
        <IonCol>
          <IonCardHeader>
            <IonCardTitle
              onClick={() =>
                navigateToUserProfileByUsername(props.user.username)
              }
              className="w-96 font-inknut text-sm"
            >
              {props.user.real_name}
            </IonCardTitle>
            <IonCardSubtitle
              onClick={() =>
                navigateToUserProfileByUsername(props.user.username)
              }
              className="font-inknut"
            >
              @{props.user.username}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCol>
        <IonCol className="ion-text-end mr-16">
          <IonButton
            fill="clear"
            color="dark"
            onClick={(e: any) => {
              e.persist();
              setPopoverEvent(e.nativeEvent);
              setShowPopover(true);
            }}
          >
            <IonIcon slot="icon-only" icon={ellipsisVertical} />
          </IonButton>
        </IonCol>
      </IonItem>
      <IonRow className="md:ml-24 md:pr-24 ml-6 pr-6 grid font-inknut text-xs">
        <IonLabel className="leading-6">
          {renderPostContent(props.post.content)}
        </IonLabel>
        <IonThumbnail className="mt-4 w-full h-auto" onClick={toggleModal}>
          <IonImg
            alt="Post Image"
            src={`http://localhost:8000/${props.post.image}`}
          />
        </IonThumbnail>
        <IonRow className="ion-align-items-start ion-justify-content-start mt-4">
          <IonLabel>Posted on {props.post.date_posted}</IonLabel>
        </IonRow>
        <IonRow className="ion-align-items-start ion-justify-content-start mt-4">
          <IonButton fill="clear" color="danger" onClick={likeHandler}>
            <IonIcon slot="start" icon={isLiked ? heart : heartOutline} />
            <IonLabel style={{ marginLeft: 10 }}>{likes}</IonLabel>
          </IonButton>
          <IonButton
            fill="clear"
            color="primary"
            routerLink={`/post/${props.post.id}`}
          >
            <IonIcon slot="start" icon={chatbubblesOutline} />
            <IonLabel style={{ marginLeft: 10 }}>
              {props.post.comments}
            </IonLabel>
          </IonButton>

          <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => setShowPopover(false)}
            event={popoverEvent}
          >
            <IonList>
              <IonItem button onClick={handleShareClick}>
                <IonLabel>Share</IonLabel>
              </IonItem>
              <IonItem button onClick={handleReportClick}>
                <IonLabel>Report</IonLabel>
              </IonItem>
              {authCtx?.user.id === props.user.id && (
                <>
                  <IonItem button onClick={handleEditClick}>
                    <IonLabel>Edit</IonLabel>
                  </IonItem>
                  <IonItem button onClick={handleDeleteClick}>
                    <IonLabel>Delete</IonLabel>
                  </IonItem>
                </>
              )}
            </IonList>
          </IonPopover>
        </IonRow>
      </IonRow>
      <IonModal isOpen={showModal}>
        <IonGrid>
          <IonRow className="ion-justify-content-end">
            <IonButton fill="clear" color="dark" onClick={toggleModal}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonImg
              alt="Full Image"
              src={`http://localhost:8000/${props.post.image}`}
            />
          </IonRow>
        </IonGrid>
      </IonModal>

      {/* Alert Konfirmasi Hapus */}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={"Confirm Delete"}
        message={"Are you sure you want to delete this post?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: "Delete",
            handler: confirmDeletePost,
          },
        ]}
      />

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastMessage.includes("successfully") ? "success" : "danger"}
      />
    </>
  );
};

export default PostCard;
