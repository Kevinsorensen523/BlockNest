import React, { useRef, useState } from "react";
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
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const url = "http://localhost/blocknest/add_new_user.php";
  const emailRef = useRef<HTMLIonInputElement>();
  const unameRef = useRef<HTMLIonInputElement>();
  const passRef = useRef<HTMLIonInputElement>();

  const handleRegister = () => {
    console.log("Register with:", email, username, password);
    // Add your registration logic here
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('username', username);
    formdata.append('password', password);
    axios.post(url, formdata).then(res => {
      console.log(res);
  });
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            //ref={emailRef}
            clearInput
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            clearInput
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            clearInput
          />
        </IonItem>
        <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
