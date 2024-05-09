import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import { searchOutline } from "ionicons/icons";
import "./Search.css";
import "./../../../Global.css";
import PostCard from "../../../components/PostCard";
import { User } from "../../../components/context/AuthContext";
import { PostObj } from "../../../components/context/AuthContext";

interface SearchResult {
  top_sentence: string;
  sentence_count: number;
}

interface MiniUser {
  username: string;
  full_name: string;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const Search: React.FC<PostProps> = (props) => {
  const [search, setSearch] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const url = "http://localhost:8000/home_page_posts.php";

  const fetchTopSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/top-search");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearch(data);
    } catch (error) {
      console.error("Error fetching top search:", error);
    }
  };

  useEffect(() => {
    fetchTopSearch();
  }, []);

  const handleSearchChange = (event: CustomEvent) => {
    const query = event.detail.value || "";
    setSearchQuery(query);
  };

  const handleItemClick = (topSentence: string) => {
    history.push(`/search/${encodeURIComponent(topSentence)}`); // Ubah URL sesuai dengan hasil pencarian yang dipilih
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonSearchbar
                  debounce={1}
                  onIonChange={handleSearchChange}
                  value={searchQuery}
                  autocapitalize="none"
                  className="rounded-bar"
                ></IonSearchbar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonTitle className="ion-text-center mt-4 text-md">
                  Hot For You
                </IonTitle>
                <IonList className="bg-black">
                  {search.map((result, index) => (
                    <IonItem
                      key={index}
                      button
                      onClick={() => handleItemClick(result.top_sentence)}
                      className="mt-0.5"
                    >
                      <IonIcon
                        slot="end"
                        icon={searchOutline}
                        className="text-white"
                      />
                      <IonLabel className="font-josefin text-md md:text-lg">
                        {result.top_sentence}
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Search;
