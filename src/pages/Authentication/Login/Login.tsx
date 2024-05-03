import React, { useState } from "react";
import {
  IonContent,
  IonButton,
  IonInput,
  IonText,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useAuth } from "../../../components/context/AuthContext";
import { Link } from "react-router-dom";
import "./../../../Global.css";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempted with:", emailOrUsername, password);
    login();
  };

  return (
    <IonContent>
      <div className="floating-logo"></div>
      <div className="login-container">
        <div className="register-form">
          <IonItem lines="inset"> 
            <IonLabel>Email/Username:</IonLabel> 
            <IonInput
              value={emailOrUsername}
              onIonChange={(e) => setEmailOrUsername(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem lines="inset"> 
            <IonLabel>Password:</IonLabel> 
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <div style={{ margin: "10px auto", maxWidth: "300px" }}>
            <IonButton className="login-button" onClick={handleLogin}>
              Login
            </IonButton>
          </div>
        </div>
        <IonText>
          <p className="forget-password">Forget Password</p>
        </IonText>
        <IonText>
          <p className="register-text">
            Doesn't have an account? <Link to="/register">Register</Link>
          </p>
        </IonText>
      </div>
    </IonContent>
  );
};

export default Login;
