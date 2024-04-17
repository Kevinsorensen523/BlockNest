import React, { useState } from "react";
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
  IonAvatar,
  IonCardHeader,
  IonCardSubtitle,
  IonNavLink,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { camera, images, close } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Home from "../Home/Home";

const Post: React.FC = () => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<string>();
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
  };

  const choosePhotoFromGallery = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    setPhoto(image.webPath);
  };

  const handleSubmit = () => {
    console.log("Submitting Post:", text, photo);
    // Implement your submit logic here, e.g., form submission or API call
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
              alt="Silhouette of a person's head"
              src="./public/profilesq.jpg"
            />
          </IonAvatar>
          <IonCardHeader>
            <IonCardSubtitle>@leonardo1945</IonCardSubtitle>
          </IonCardHeader>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Your post</IonLabel>
          <IonTextarea
            value={text}
            onIonChange={handleTextChange}
            placeholder="Write something..."
            rows={6}
          />
        </IonItem>

        <IonButton
          className="mt-8 "
          color="light"
          expand="block" 
          onClick={() => setShowActionSheet(true)}>
          <IonIcon icon={camera} slot="start" />
        </IonButton>
          {photo && <IonImg className="max-w-96 mx-auto py-10" src={photo} />}

        <IonButton 
        className="mt-16 max-w-28"
        color="light"
        expand="block" onClick={handleSubmit}>
          Post
        </IonButton>
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
