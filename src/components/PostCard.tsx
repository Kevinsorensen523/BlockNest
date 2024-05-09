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
} from "@ionic/react";
import {
  heartOutline,
  chatbubblesOutline,
  ellipsisVertical,
} from "ionicons/icons";
import { close } from "ionicons/icons";
import { AuthContext, PostObj, User } from "./context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router";

interface PostProps {
  post: PostObj;
  user: User;
}

const PostCard: React.FC<PostProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>(null);
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(0);
  const [likes, setLikes] = useState(props.post.likes);

  const url = "http://localhost:8000/like_post.php";
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("post_id", props.post.id.toString() as string);
    formdata.append("user_id", authCtx?.user.id.toString() as string);
    formdata.append("type", "check");
    axios.post(url, formdata).then((res) => {
      setIsLiked(res.data.isLiked);
    });
  }, []);

  const likeHandler = () => {
    console.log(isLiked);
    const formdata = new FormData();
    formdata.append("post_id", props.post.id.toString() as string);
    formdata.append("user_id", props.user.id.toString() as string);
    if (isLiked == 0) {
      formdata.append("type", "like");
      setLikes(likes + 1);
    } else {
      formdata.append("type", "unlike");
      setLikes(likes - 1);
    }
    axios.post(url, formdata).then((res) => {
      setIsLiked(res.data.isLiked);
    });
  };

  const toggleModal = () => setShowModal(!showModal);

  const findTags = (content: string) => {
    const words = content.split(" ");
    const tags: string[] = [];
    words.forEach((word) => {
      if (word.startsWith("#")) {
        tags.push(word.substring(1));
      } else if (word.startsWith("@")) {
        tags.push(word.substring(1));
      }
    });
    return tags;
  };

  const renderPostContent = (content: string) => {
    const tags = findTags(content);
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
            return (
              <span
                key={index}
                style={{ color: "#7cd3f8", cursor: "pointer" }}
                onClick={() => history.push(`/user/${word.substring(1)}`)}
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
    // Logika untuk meng-handle klik edit di sini
    setShowPopover(false);
  };

  const handleDeleteClick = () => {
    // Logika untuk meng-handle klik delete di sini
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
            onClick={() => history.push(`/user/${props.user.username}`)}
          />
        </IonAvatar>
        <IonCol>
          <IonCardHeader>
            <IonCardTitle
              onClick={() => history.push(`/user/${props.user.username}`)}
              className="w-96 font-inknut text-sm"
            >
              {props.user.real_name}
            </IonCardTitle>
            <IonCardSubtitle
              onClick={() => history.push(`/user/${props.user.username}`)}
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
          <IonButton fill="clear" color="danger" onClick={likeHandler}>
            <IonIcon slot="start" icon={heartOutline} />
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
    </>
  );
};

export default PostCard;
