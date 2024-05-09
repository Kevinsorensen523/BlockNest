import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonRouterLink,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface User {
  username: string;
  profile_pic: string;
}

const RecomendedUserCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Inisialisasi `useHistory` untuk navigasi
  const history = useHistory();

  // Fungsi untuk mengambil data pengguna dari server Python
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/top-users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const basePath = "./../blocknest-backend/";

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (username: string) => {
    history.push(`/people/${username}`);
  };

  return (
    <IonCard className="fixed lg:w-80 md:w-80 w-80 md:-ml-10 lg:ml-0 rounded-xl ion-padding">
      <IonCardHeader>
        <IonCardSubtitle className="text-white font-bold text-lg">
          Recommended For You
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {users.map((user, index) => (
            <IonItem
              key={index}
              button
              onClick={() => handleUserClick(user.username)}
            >
              <IonThumbnail slot="start">
                <img
                  alt={`Profile of ${user.username}`}
                  src={`${basePath}${user.profile_pic}`}
                  className="w-10 h-10 rounded-full"
                />
              </IonThumbnail>
              <IonLabel className="-mt-2">@{user.username}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default RecomendedUserCard;
