import React, { lazy, Suspense, useEffect, useState } from "react";
import { IonContent, IonPage, IonGrid, IonLabel, IonTitle } from "@ionic/react";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import axios from "axios";
import { useAuth } from "../../../components/context/AuthContext";

interface UserInteraction {
  id: number;
  post_id: number | null;
  user_id: number;
  target_user_id: number;
  action_type: "like" | "comment" | "follow";
  created_at: string;
  post_image?: string;
  username: string;
  profile_pic: string;
  isOpen: boolean;
}

const NotificationCard = lazy(
  () => import("../../../components/NotificationCard")
);

const Notification: React.FC = () => {
  const { user } = useAuth();
  const [newInteractions, setNewInteractions] = useState<UserInteraction[]>([]);
  const [seenInteractions, setSeenInteractions] = useState<UserInteraction[]>(
    []
  );

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:5000/api/user-interactions/${user.id}`)
        .then((response) => {
          const newInt = response.data.filter(
            (interaction: UserInteraction) =>
              interaction.isOpen == false && interaction.user_id !== user.id
          );
          const seenInt = response.data.filter(
            (interaction: UserInteraction) =>
              interaction.isOpen == true && interaction.user_id !== user.id
          );
          setNewInteractions(newInt);
          setSeenInteractions(seenInt);
        })
        .catch((err) => console.error("Failed to fetch interactions", err));
    }
  }, [user]);

  return (
    <IonPage id="main-content">
      <SideMenu />
      <Header />
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonTitle>New</IonTitle>
          <Suspense fallback={<div>Loading interactions...</div>}>
            <IonGrid className="bg-[#181818]">
              {newInteractions.map((interaction, index) => (
                <div key={index}>
                  <NotificationCard {...interaction} />
                </div>
              ))}
            </IonGrid>
          </Suspense>
        </IonGrid>
        <IonGrid className="ion-padding">
          <IonTitle>Seen</IonTitle>
          <Suspense fallback={<div>Loading interactions...</div>}>
            <IonGrid>
              {seenInteractions.map((interaction, index) => (
                <div key={index}>
                  <NotificationCard {...interaction} />
                </div>
              ))}
            </IonGrid>
          </Suspense>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
