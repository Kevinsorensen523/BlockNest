import React, { useEffect, useRef, useState } from "react";
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
  IonToast,
} from "@ionic/react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { arrowBack, eye, eyeOff } from "ionicons/icons";
import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const history = useHistory();

  const url = "http://blocknest.great-site.net/add_new_user.php";
  const emailRef = useRef<HTMLIonInputElement>();
  const unameRef = useRef<HTMLIonInputElement>();
  const passRef = useRef<HTMLIonInputElement>();

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex for password validation: at least 8 characters, one uppercase, one lowercase, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSendVerificationCode = () => {
    // Set the countdown to 30 seconds
    setCountdown(30);
    // Simulate sending a verification code
    console.log("Verification code sent");
  };

  const handleRegister = () => {
    // Log all input field values to verify they're being captured
    console.log("Input Data:", {
      email,
      username,
      password,
      confirmPassword,
      verificationCode,
    });

    // Check if any field is empty
    if (
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !verificationCode
    ) {
      setToastMessage("Please fill out all fields!");
      setShowToast(true);
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setToastMessage("Invalid email format.");
      setShowToast(true);
      return;
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      setToastMessage(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one symbol."
      );
      setShowToast(true);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      setShowToast(true);
      return;
    }

    // Create form data for the request
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("verificationCode", verificationCode);

    // Make an API request to register the user
    axios
      .post(url, formdata)
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data.success) {
          setToastMessage("Registration successful!");
          setShowToast(true);
          // Redirect to login after a short delay
          setTimeout(() => history.push("/login"), 3000);
        } else {
          setToastMessage("Registration failed. Please try again.");
          setShowToast(true);
        }
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        setToastMessage("Error connecting to the server. Please try again.");
        setShowToast(true);
      });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
          <div className="mt-4 md:mt-8 font-inder capitalize text-lg">
            <IonLabel position="floating">Username :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
                placeholder="Fill Your Username"
                className="flex font-inder"
                // clearInput
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-6 font-inder capitalize text-lg">
            <IonLabel position="floating">Email :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="Fill Your Email"
                className="flex font-inder"
                // clearInput
              ></IonInput>
            </IonItem>
          </div>
          <div className="mt-6 font-inder capitalize text-lg">
            <IonLabel position="floating">Password :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type={showPassword ? "text" : "password"}
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder="Fill Your Password"
                className="flex font-inder"
                // clearInput
              ></IonInput>
              <IonButton
                fill="clear"
                slot="end"
                onClick={togglePasswordVisibility}
              >
                <IonIcon
                  className="text-white"
                  icon={showPassword ? eyeOff : eye}
                />
              </IonButton>
            </IonItem>
          </div>
          <div className="mt-6 font-inder capitalize text-lg">
            <IonLabel position="floating">Confirm Password :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                placeholder="Confirm Your Password"
                className="flex font-inder"
                // clearInput
              ></IonInput>
              <IonButton
                fill="clear"
                slot="end"
                onClick={toggleConfirmPasswordVisibility}
              >
                <IonIcon
                  className="text-white"
                  icon={showConfirmPassword ? eyeOff : eye}
                />
              </IonButton>
            </IonItem>
          </div>
          <div className="mt-6 font-inder capitalize text-lg">
            <IonLabel position="floating">Verification Code :</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                value={verificationCode}
                onIonChange={(e) => {
                  // Ensure the input is up to 6 characters and includes only digits
                  const value = e.detail.value || "";
                  if (/^\d{0,6}$/.test(value)) {
                    setVerificationCode(value);
                  }
                }}
                placeholder="Enter verification code"
                className="flex font-inder"
                maxlength={6}
                type="text" // Use "text" instead of "number"
              />
              <IonButton
                className="roundedInput"
                // onClick={handleSendVerificationCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Wait ${countdown}s` : "Send"}
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
          <IonText className="font-inder capitalize text-lg">
            Already have an account? <Link to="/login">Login</Link>
          </IonText>
        </div>
      </div>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color={toastMessage.includes("successful") ? "success" : "danger"}
      />
    </IonContent>
  );
};

export default Register;
