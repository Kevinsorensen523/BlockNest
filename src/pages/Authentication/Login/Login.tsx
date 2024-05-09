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
  IonAvatar,
  IonToast,
  IonProgressBar,
} from "@ionic/react";
import { User, useAuth } from "../../../components/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import Logo from "./../../../../public/BlockNest-logo.jpg";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AxiosResponse>();
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  const url = "http://localhost:8000/login_proses.php";

  const handleLogin = () => {
    console.log("Login attempted with:", username, password);
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    axios
      .post(url, formdata)
      .then((res) => {
        if (res.data.success) {
          setLoading(true);
          login(res.data.user[0].username, res.data.user[0]);
          // Delay 2 seconds, then navigate to the home page
          setTimeout(() => {
            setLoading(false);
            history.push("/home");
          }, 2000);
        } else {
          // Display toast message if login fails
          setToastMessage("Invalid username or password.");
          setShowToast(true);
        }
      })
      .catch(() => {
        // Handle errors
        setToastMessage("Error connecting to the server. Please try again.");
        setShowToast(true);
      });
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      login(user.username, user);
    }
  }, [login]);

  return (
    <IonContent>
      <div className="md:ion-padding p-10 items-center">
        <IonAvatar
          className="grid justify-self-center mx-auto md:my-20 my-4 md:w-36 w-28"
          style={{ borderRadius: "80%" }}
        >
          <img alt="Logo" src={Logo} />
        </IonAvatar>

        <div className="login-form sm:px-20 md:px-40 lg:px-56 xl:px-96 md:py-10 py-12">
          <div>
            <IonLabel
              className="font-inder capitalize text-lg"
              position="floating"
            >
              Username :
            </IonLabel>
            <IonItem lines="inset" className="mt-4 roundedInput">
              <IonInput
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                placeholder="please insert your username"
                className="font-inder text-lg"
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-10">
            <IonLabel
              className="font-inder capitalize text-lg"
              position="floating"
            >
              Password :
            </IonLabel>
            <IonItem lines="inset" className="mt-4 roundedInput">
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder="please insert your correct password"
                className="font-inder text-lg"
              ></IonInput>
            </IonItem>
          </div>
          <IonButton
            shape="round"
            className="md:mt-20 py-10 md:py-0 grid justify-items-center w-24 h-10 mx-auto authButton"
            onClick={handleLogin}
          >
            Log In
          </IonButton>
        </div>
        <div className="justify-items-center grid -mt-8 md:mt-0">
          <IonText className="font-inder capitalize text-lg">
            <Link to="/changePassword">Forgot Password</Link>
          </IonText>
          <IonText className="mt-4 font-inder capitalize text-lg">
            Don't have an account? <Link to="/register">Register</Link>
          </IonText>
        </div>
      </div>
      {loading && (
        <IonProgressBar type="indeterminate" color="primary" className="my-4" />
      )}

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color="danger"
      />
    </IonContent>
  );
};

export default Login;
