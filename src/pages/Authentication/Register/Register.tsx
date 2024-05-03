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
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./../../../Global.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const history = useHistory();

  const handleSendCode = () => {
    console.log("Send verification code to:", email);
    
  };

  const handleRegister = () => {
    console.log("Register with:", email, username, password, verificationCode);
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="floating-circle"></div> 
        <div className="register-form">
          <IonItem>
            <IonLabel position="floating">Email:</IonLabel>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail}
              clearInput
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Username:</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername}
              clearInput
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password:</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword}
              clearInput
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Confirm Password:</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword}
              clearInput
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Verification Code:</IonLabel>
            <IonInput
              value={verificationCode}
              onIonChange={(e) => setVerificationCode}
              clearInput
            />
            <IonButton slot="end" onClick={handleSendCode}>Send Code</IonButton>
          </IonItem>
          <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;