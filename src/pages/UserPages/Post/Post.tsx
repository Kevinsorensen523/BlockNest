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
} from "@ionic/react";
import { camera, images, close } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

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
          <IonTitle>Create Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Your post</IonLabel>
          <IonTextarea
            value={text}
            onIonChange={handleTextChange}
            placeholder="Write something..."
          />
        </IonItem>
        <IonButton expand="block" onClick={() => setShowActionSheet(true)}>
          <IonIcon icon={camera} slot="start" />
          Add Photo
        </IonButton>
        {photo && <IonImg className="max-w-96 mx-auto py-10" src={photo} />}
        <IonButton expand="block" onClick={handleSubmit}>
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
