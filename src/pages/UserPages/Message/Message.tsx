// Message.tsx
import React from "react";
import { IonContent, IonPage, IonList, IonItem, IonAvatar, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";

const Message: React.FC = () => {
  const contacts = [
    { name: "User 1", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "User 2", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { name: "User 3", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
    { name: "User 4", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  ];

  const history = useHistory();

  const handleContactClick = (name: string) => {
    history.push(`/chat/${name}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList>
          {contacts.map((contact, index) => (
            <IonItem key={index} button onClick={() => handleContactClick(contact.name)}>
              <IonAvatar slot="start">
                <img src={contact.avatar} alt="avatar" />
              </IonAvatar>
              <IonLabel>
                <h2>{contact.name}</h2>
                <p>Last message preview...</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Message;
