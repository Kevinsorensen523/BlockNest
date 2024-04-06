import {
  IonActionSheet,
  IonAvatar,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logOutOutline, personCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Header: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<Event>();
  const history = useHistory();

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
    setShowPopover(false);
    console.log("Logout clicked");
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton menu="first" autoHide={false} />
        </IonButtons>
        <IonTitle className="ion-text-center">Blocknest</IonTitle>
        <IonButtons slot="end" onClick={handlePopoverOpen}>
          <IonAvatar>
            <img
              src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
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
        </IonList>
      </IonPopover>
    </IonHeader>
  );
};

export default Header;
