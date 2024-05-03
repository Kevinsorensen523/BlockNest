import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { User, useAuth } from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

//interface User { id: string, email: string, username: string, password: string};

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AxiosResponse>();
  const [user, setUser] = useState<User>();

  const url = "http://localhost/blocknest/login_proses.php";

  const handleLogin = () => {
    console.log("Login attempted with:", username, password);
    // Asumsikan login akan diproses di sini
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    axios.post(url, formdata).then((res) => {
      console.log(res.data);
      setData(res);
      setUser(res.data.user[0]);
      console.log(res.data.user[0]);
      console.log(
        "Login attempted with:",
        res.data.user[0].username,
        res.data.user[0].password
      );
      const e = res.data.user[0].username;
      const f = res.data.user[0];
      console.log(e);
      login(e, f);
    });
    /*axios.get(url).then((response) => {
      setData(response);
      console.log(response);
      setUser(response.data.user);
    });*/
    console.log("Login attempted with:", user?.username, user?.password);
  };

  return (
    <IonContent>
      <div className="login-container p-10">
        <div className="register-form">
          <IonItem lines="inset">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              //clearInput
            ></IonInput>
          </IonItem>
          <IonItem lines="inset">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              //clearInput
            ></IonInput>
          </IonItem>
          <div style={{ margin: "10px auto", maxWidth: "300px" }}>
            <IonButton expand="block" onClick={handleLogin}>
              Log In
            </IonButton>
          </div>
        </div>
        <div className="mx-auto">
          <IonText>
            <Link to="/changePassword">Forgot Password</Link>
          </IonText>
          <IonText>
            <p className="register-text">
              Doesn't have an account? <Link to="/register">Register</Link>
            </p>
          </IonText>
        </div>
      </div>
    </IonContent>
  );
};

export default Login;
