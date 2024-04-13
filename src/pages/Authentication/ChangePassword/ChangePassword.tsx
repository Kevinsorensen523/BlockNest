import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleResetPassword = () => {
    console.log("Password reset for:", email);
    // Implement your password reset logic here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push("/login")}>
              Back to Login
            </IonButton>
          </IonButtons>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            clearInput
          />
        </IonItem>
        <IonButton expand="block" onClick={handleResetPassword}>
          Send Reset Link
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
