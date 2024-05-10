import React, { useContext, useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonIcon,
  IonImg,
  IonAvatar,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
  IonBackButton,
  IonButtons,
  IonRow,
} from "@ionic/react";
import { camera, images } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { decode } from "base64-arraybuffer";
import { AuthContext } from "../../../components/context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router";
import Home from "../Home/Home";
import "./Post.css";

const Post: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<string>();
  const [photoFile, setPhotoFile] = useState<File>();

  const handleTextChange = (event: CustomEvent) => {
    setText(event.detail.value);
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Use CameraSource.Camera to directly open the camera
    });

    setPhoto(image.webPath);
    savePhoto(image.webPath!);
  };

  const savePhoto = async (webpath: string) => {
    const base64 = await base64FromPath(webpath);
    const b64split = base64.split(";base64,");
    const blob = new Blob([new Uint8Array(decode(b64split[1]))], {
      type: "image/png",
    });
    const fileName = new Date().getTime() + ".png";
    const file = new File([blob], fileName, {
      type: "image/png",
    });
    setPhotoFile(file);
  };

  const inputPhoto = useRef<HTMLInputElement>(null);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoFile(event.target!.files![0]);
    console.log(authCtx?.user.id);
  };

  const choosePhotoFromGallery = async () => {
    inputPhoto.current?.click();
  };

  const url = "http://localhost:8000/add_new_post.php";

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("content", text as string);
    formData.append("user_id", authCtx?.user.id.toString() as string);
    formData.append("photo", photoFile as File);
    console.log(formData);
    axios.post(url, formData).then((res) => {
      console.log(res.data);
    });
    history.length > 0 ? history.goBack() : history.replace("/home");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Post</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonItem
          style={{ "--background": "transparent" }}
          className="pt-1"
          lines="none"
        >
          <IonAvatar slot="start">
            <img
              alt="Profile Picture"
              src={`http://localhost:8000/${authCtx?.user.profile_pic}`}
              className="w-10 h-10"
            />
          </IonAvatar>
          <IonCardHeader>
            <IonCardSubtitle>@{authCtx?.uName}</IonCardSubtitle>
          </IonCardHeader>
        </IonItem>
        {photo && (
          <IonImg
            className="max-w-96 mx-auto py-10 md:ml-20 md:mx-0"
            src={photo}
          />
        )}
        <IonItem lines="none" className="md:mx-20 mx-6">
          <IonLabel position="stacked">Your post</IonLabel>
          <IonTextarea
            value={text}
            onIonChange={handleTextChange}
            placeholder="Write something..."
            rows={6}
          />
        </IonItem>
        <IonGrid className="flex ml-4 md:ml-20">
          <IonButton expand="block" onClick={takePhoto} color="light">
            <IonIcon icon={camera} slot="start" />
          </IonButton>
          <IonButton
            expand="block"
            onClick={choosePhotoFromGallery}
            color="light"
          >
            <IonIcon icon={images} slot="start" />
          </IonButton>
          <input
            type="file"
            onChange={fileChangeHandler}
            ref={inputPhoto}
            style={{ display: "none" }}
          />
        </IonGrid>

        <IonButton
          expand="block"
          shape="round"
          className="ion-margin-top max-w-28 mx-auto postButton"
          onClick={handleSubmit}
        >
          Post
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Post;
