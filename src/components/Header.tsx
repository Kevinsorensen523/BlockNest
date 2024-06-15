import React, { useContext, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonPopover,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonAlert,
  IonButton,
} from "@ionic/react";
import {
  personCircleOutline,
  logOutOutline,
  logoBitcoin,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { AuthContext, useAuth } from "../components/context/AuthContext";
// @ts-ignore
import { connectToMetaMask, donateEther } from "./../utils/ethereum";

const Header: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<Event>();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();
  const authCtx = useContext(AuthContext);

  const handlePopoverOpen = (event: React.MouseEvent) => {
    event.persist();
    setPopoverEvent(event.nativeEvent);
    setShowPopover(true);
  };

  const goToProfile = () => {
    setShowPopover(false);
    history.push("/profile");
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true); // Tampilkan konfirmasi logout
  };

  const handleDonate = async () => {
    const web3 = await connectToMetaMask();
    if (web3) {
      await donateEther(
        web3,
        "0xbCd8579A6b81e3260Ad9CF1f62B47Fba8934572f",
        "0.1"
      );
    }
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton menu="first" autoHide={false} />
        </IonButtons>
        <IonTitle className="ion-text-center font-inknut font-bold text-shadow-lg">
          BlockNest
        </IonTitle>
        <IonButtons slot="end" onClick={handlePopoverOpen}>
          <IonAvatar>
            <img
              src={`http://blocknest.great-site.net/${authCtx?.user.profile_pic}`}
              alt="Profile"
              className="w-12 h-12 mt-2"
            />
          </IonAvatar>
        </IonButtons>
      </IonToolbar>

      <IonPopover
        event={popoverEvent}
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem button onClick={goToProfile}>
            <IonIcon icon={personCircleOutline} slot="start" />
            <IonLabel>Go to Profile</IonLabel>
          </IonItem>
          <IonItem button onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel>Logout</IonLabel>
          </IonItem>
          <IonItem button onClick={handleDonate}>
            <IonIcon icon={logoBitcoin} slot="start" />
            <IonLabel>Donate to Developer</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>

      {/* Alert Konfirmasi Logout */}
      <IonAlert
        isOpen={showLogoutConfirm}
        onDidDismiss={() => setShowLogoutConfirm(false)}
        header={"Confirm Logout"}
        message={"Are you sure you want to log out?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              setShowLogoutConfirm(false);
            },
          },
          {
            text: "Logout",
            handler: () => {
              logout();
              history.push("/login");
            },
          },
        ]}
      />
    </IonHeader>
  );
};

export default Header;
