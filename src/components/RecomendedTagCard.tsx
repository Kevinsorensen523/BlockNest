import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonList,
  IonRouterLink,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

const RecomendedTagCard: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);

  // Fungsi untuk mengambil data tag dari server Python
  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/top-tags");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Ambil tag saat komponen dimount
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <IonCard className="fixed lg:w-80 md:w-80 w-80 md:-ml-10 lg:ml-0 rounded-xl ion-padding">
      <IonCardHeader>
        <IonCardSubtitle className="text-white font-bold text-lg">
          Recommended For You
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className="-mt-4">
        <IonList>
          {tags.map((tag, index) => (
            <IonItem key={index}>
              <IonRouterLink
                routerLink={`/hashtag/${tag.substring(1)}`}
                className="!text-blue-300 hover:!text-blue-500"
              >
                {tag}
              </IonRouterLink>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default RecomendedTagCard;
