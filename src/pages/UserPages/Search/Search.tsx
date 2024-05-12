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
  IonButton,
  IonAvatar,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import Header from "../../../components/Header";
import { arrowBackOutline, searchOutline } from "ionicons/icons";
import "./Search.css";
import "./../../../Global.css";
import { User, PostObj } from "../../../components/context/AuthContext";
import axios from "axios";

const PostCard = lazy(() => import("../../../components/PostCard"));

interface SearchResult {
  top_sentence: string;
  sentence_count: number;
}

interface UserDetail {
  username: string;
  profile_pic: string;
  followers: number;
}

interface PostProps {
  posts: Array<PostObj>;
  user: User;
}

const Search: React.FC<PostProps> = (props) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTitle, setCurrentTitle] = useState("Hot For You");
  const [currentTitle2, setCurrentTitle2] = useState("Hot For You");
  const [searchDone, setSearchDone] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetail[]>([]);
  const [posts, setPosts] = useState<Array<PostObj>>([]);
  const history = useHistory();
  const url = "http://localhost:8000/search_posts.php";
  const url2 = `http://localhost:5000/api/search_user?currentTitle=${encodeURIComponent(
    currentTitle
  )}`;
  const basePath = "./../blocknest-backend/";

  const fetchTopSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/top-search");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching top search:", error);
    }
  };

  useEffect(() => {
    getData();
    getData2();
  }, [currentTitle]);

  const getData = () => {
    const formdata = new FormData();
    formdata.append("currentTitle", `${currentTitle}`);
    axios
      .post(url, formdata)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.post);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const getData2 = () => {
    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    fetchTopSearch();
  }, []);

  const handleSearchChange = (event: CustomEvent) => {
    setSearchQuery(event.detail.value);
    setSearchDone(true);
    const currentTitle = event.detail.value;
    setCurrentTitle2("Result For " + currentTitle);
    const formdata = new FormData();
    formdata.append("currentTitle", `${currentTitle}`);
    axios
      .post(url, formdata)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.post);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    const urlForUserDetails = `http://localhost:5000/api/search_user?currentTitle=${encodeURIComponent(
      currentTitle
    )}`;

    // Fetching user details
    fetch(urlForUserDetails)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  const handleItemClick = async (topSentence: string) => {
    setCurrentTitle(topSentence);
    setCurrentTitle2("Search Result For " + topSentence);
    setSearchQuery(topSentence);
    setSearchDone(true);
  };

  const handleSearchReset = () => {
    setSearchQuery("");
    setSearchDone(false);
    setCurrentTitle("Hot For You");
    setPosts([]);
  };

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
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
          <IonCol size="12" className="flex mb-4">
            {searchDone ? (
              <>
                <IonButton
                  color="dark"
                  fill="clear"
                  onClick={handleSearchReset}
                >
                  <IonIcon icon={arrowBackOutline} />
                </IonButton>
                <IonTitle className="ion-text-center mt-4 text-md">
                  {currentTitle2}
                </IonTitle>
              </>
            ) : (
              <>
                <IonTitle className="ion-text-center mt-4 text-md">
                  Hot For You
                </IonTitle>
              </>
            )}
          </IonCol>
        </IonRow>
        <IonContent>
          <IonGrid>
            <IonRow>
              {searchDone ? (
                <>
                  <IonCol size="12">
                    <IonCard>
                      <IonCardContent>
                        <IonList>
                          {userDetails.map((user, index) => (
                            <Link
                              to={`/people/${user.username}`}
                              key={index}
                              style={{ textDecoration: "none" }}
                            >
                              <IonItem
                                className="hover: bg-slate-500"
                                lines="inset"
                              >
                                <IonAvatar slot="start">
                                  <img
                                    src={`${basePath}${user.profile_pic}`}
                                    alt="User Profile"
                                    className="w-10 h-10"
                                  />
                                </IonAvatar>
                                <IonLabel className="font-inder">
                                  @{user.username} - Followers: {user.followers}
                                </IonLabel>
                              </IonItem>
                            </Link>
                          ))}
                        </IonList>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol>
                    <Suspense fallback={<div>Loading posts...</div>}>
                      <IonGrid className="2xl:px-40 2xl:mx-80 xl:px-16 xl:mx-80 lg:mx-72">
                        {posts.map((post, index) => (
                          <PostCard key={index} post={post} user={post.user} />
                        ))}
                      </IonGrid>
                    </Suspense>
                  </IonCol>
                </>
              ) : (
                <IonCol size="12">
                  <IonList className="bg-black">
                    {searchResults.map((result, index) => (
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
              )}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Search;
