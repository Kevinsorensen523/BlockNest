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
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { arrowBack } from "ionicons/icons";
import Logo from "./../../../../public/BlockNest-logo.jpg";

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleResetPassword = () => {
    console.log("Password reset for:", email);
    // Implement your password reset logic here
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
          <IonAvatar className="grid justify-self-center mx-auto md:my-20 md:-mt-2 my-4 md:mb-20 mb-8 md:w-36 w-28">
            <img alt="Logo" src={Logo} />
          </IonAvatar>
          <div>
            <IonLabel position="floating">Email :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
          </div>

          <div className="mt-6">
            <IonLabel position="floating">New Password :</IonLabel>
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
              <IonButton className="roundedInput" onClick={handleResetPassword}>
                Send
              </IonButton>
            </IonItem>
          </div>
          <IonButton
            shape="round"
            className="md:mt-20 py-10 md:py-0 grid justify-items-center w-24 h-10 mx-auto authButton"
            // onClick={handleResetPassword}
          >
            Confirm
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default ChangePassword;
