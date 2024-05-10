import React, { useEffect, useState } from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonAvatar,
  IonButtons,
  IonToast,
  IonContent,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { arrowBack, eye, eyeOff } from "ionicons/icons";
import Logo from "./../../../../public/BlockNest-logo.jpg";

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleResetPassword = () => {
    if (!email || !newPassword || !confirmPassword) {
      setToastMessage("Please fill out all fields!");
      setShowToast(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setToastMessage("Invalid email format.");
      setShowToast(true);
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setToastMessage(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one symbol."
      );
      setShowToast(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      setShowToast(true);
      return;
    }

    // Proceed with password reset logic
    console.log("Password reset for:", email);
  };

  // Countdown timer logic
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
          <IonAvatar className="grid justify-self-center mx-auto md:my-20 md:-mt-2 my-4 md:mb-20 mb-8 md:w-36 w-28">
            <img alt="Logo" src={Logo} />
          </IonAvatar>
          <div className="font-inder text-lg">
            <IonLabel position="floating">Email:</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="Fill Your Email"
                className="flex font-inder"
              ></IonInput>
            </IonItem>
          </div>

          <div className="mt-6 font-inder text-lg">
            <IonLabel position="floating">New Password:</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onIonChange={(e) => setNewPassword(e.detail.value!)}
                placeholder="Fill Your New Password"
                className="flex font-inder"
              ></IonInput>
              {/* <IonButton
                fill="clear"
                slot="end"
                onClick={togglePasswordVisibility}
              >
                <IonIcon
                  className="text-white"
                  icon={showPassword ? eyeOff : eye}
                />
              </IonButton> */}
            </IonItem>
          </div>
          <div className="mt-6 font-inder text-lg">
            <IonLabel position="floating">Confirm Password:</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                placeholder="Confirm Your Password"
                className="flex font-inder"
              ></IonInput>
              {/* <IonButton
                fill="clear"
                slot="end"
                onClick={toggleConfirmPasswordVisibility}
              >
                <IonIcon
                  className="text-white"
                  icon={showConfirmPassword ? eyeOff : eye}
                />
              </IonButton> */}
            </IonItem>
          </div>
          <div className="mt-6 font-inder capitalize text-lg">
            <IonLabel position="floating">Verification Code:</IonLabel>
            <IonItem lines="inset" className="roundedInput">
              <IonInput
                value={verificationCode}
                // onIonChange={(e) => {
                //   const value = e.detail.value || "";
                //   if (/^\d{0,6}$/.test(value)) {
                //     setVerificationCode(value);
                //   }
                // }}
                placeholder="Enter verification code"
                className="flex font-inder"
                maxlength={6}
                type="text"
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
            onClick={handleResetPassword}
          >
            Confirm
          </IonButton>
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

export default ChangePassword;
