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
  IonActionSheet,
  IonBackButton,
  IonButtons,
  IonNavLink,
  IonAvatar,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
} from "@ionic/react";
import { camera, images, close } from "ionicons/icons";
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
  const [showActionSheet, setShowActionSheet] = useState(false);

  const handleTextChange = (event: CustomEvent) => {
    setText(event.detail.value);
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Use CameraSource.Prompt to prompt for source
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

  const url = "http://localhost/blocknest/add_new_post.php";

  const handleSubmit = () => {
    //console.log("Submitting Post:", text, photo);
    // Implement your submit logic here, e.g., form submission or API call
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
          <IonNavLink routerDirection="forward" component={() => <Home />}>
            <IonButtons>
              <IonBackButton defaultHref="/home" />
            </IonButtons>
          </IonNavLink>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem style={{ "--background": "transparent" }} className="pt-1">
          <IonAvatar slot="start">
            <img
              alt="Profile Picture"
              src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}
              className="w-10 h-10"
            />
          </IonAvatar>
          <IonCardHeader>
            <IonCardSubtitle>@{authCtx?.uName}</IonCardSubtitle>
          </IonCardHeader>
        </IonItem>
        <IonItem className="mx-20">
          <IonLabel position="stacked">Your post</IonLabel>
          <IonTextarea
            value={text}
            onIonChange={handleTextChange}
            placeholder="Write something..."
            rows={6}
          />
        </IonItem>
        <IonGrid>
          <IonButton
            className="mt-8 "
            color="light"
            expand="block"
            onClick={() => setShowActionSheet(true)}
          >
            <IonIcon icon={camera} slot="start" />
            Add Photo
          </IonButton>
          <input
            type="file"
            onChange={fileChangeHandler}
            ref={inputPhoto}
            style={{ display: "none" }}
          />
          {photo && <IonImg className="max-w-96 mx-auto py-10" src={photo} />}
          <IonButton
            color="light"
            expand="block"
            shape="round"
            className="ion-margin-top max-w-28 mx-auto postButton"
            onClick={handleSubmit}
          >
            Post
          </IonButton>
        </IonGrid>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Take Photo",
              icon: camera,
              handler: takePhoto,
            },
            {
              text: "Choose from Gallery",
              icon: images,
              handler: choosePhotoFromGallery,
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Post;
