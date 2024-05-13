import React, { lazy, Suspense, useEffect, useState } from "react";
import { IonContent, IonPage, IonGrid, IonLabel } from "@ionic/react";
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
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:5000/api/user-interactions/${user.id}`)
        .then((response) => {
          const filteredInteractions = response.data.filter(
            (interaction: UserInteraction) => interaction.user_id !== user.id
          );
          setInteractions(filteredInteractions);
        })
        .catch((err) => console.error("Failed to fetch interactions", err));
    }
  }, [user]);

  return (
    <IonPage id="main-content">
      <SideMenu />
      <Header />
      <IonContent fullscreen>
        <Suspense fallback={<div>Loading interactions...</div>}>
          <IonGrid>
            {interactions.map((interaction, index) => (
              <div key={index}>
                <NotificationCard {...interaction} />
              </div>
            ))}
          </IonGrid>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
