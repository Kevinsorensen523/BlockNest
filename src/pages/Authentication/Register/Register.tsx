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
  IonGrid,
  IonIcon,
  IonText,
} from "@ionic/react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { arrowBack } from "ionicons/icons";
import "./Register.css";

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
    formdata.append("email", email);
    formdata.append("username", username);
    formdata.append("password", password);
    axios.post(url, formdata).then((res) => {
      console.log(res);
    });
  };

  return (
    <IonContent>
      <div className="md:ion-padding xl:p-20 lg:p-10 px-8 -mt-10 items-center">
        <div className="register-form sm:px-20 md:px-40 lg:px-56 xl:px-96 md:py-10 py-12">
          <IonItem className="noBackground -ml-12" lines="none">
            <IonButtons slot="start">
              <IonButton
                className="w-20"
                onClick={() => history.push("/login")}
              >
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
          </IonItem>
          <div className="mt-4 md:mt-8">
            <IonLabel position="floating">Username :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                placeholder=""
                clearInput
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-6">
            <IonLabel position="floating">Email :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder=""
                clearInput
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-6">
            <IonLabel position="floating">Password :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder=""
                clearInput
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-6">
            <IonLabel position="floating">Confirm Password :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type="password"
                // value={password}
                // onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder=""
                clearInput
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-6">
            <IonLabel position="floating">Verification Code :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput placeholder="" clearInput className="flex"></IonInput>
              <IonButton
                className="roundedInput"
                // onClick={handleSendVerificationCode}
              >
                Send
              </IonButton>
            </IonItem>
          </div>

          <IonButton
            shape="round"
            className="md:mt-20 py-10 md:py-0 grid justify-items-center w-24 h-10 mx-auto authButton"
            onClick={handleRegister}
          >
            Register
          </IonButton>
        </div>
        <div className="justify-items-center grid -mt-10 md:mt-0">
          <IonText>
            Alreadt have an account? <Link to="/login">Login</Link>
          </IonText>
        </div>
      </div>
    </IonContent>
  );
};

export default Register;
