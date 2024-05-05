import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonPage,
  IonRow,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AuthContext, PostObj, User } from "../../../components/context/AuthContext";
import Header from "../../../components/Header";
import PostCard from "../../../components/PostCard";
import Home from "../Home/Home";
import Comment from "../../../components/Comment";

interface Comment {id: string, user_id: string, post_id: string, content: string, date_posted: string, likes: number, user: User}

const Comments: React.FC = () => {
  const pId = useParams<{ postId: string }>().postId;
  const url = "http://localhost/blocknest/select_post.php";
  const url2 = "http://localhost/blocknest/add_new_comment.php";
  const url3 = "http://localhost/blocknest/select_post_comments.php";
  const [data, setData] = useState<AxiosResponse>();
  const [post, setPost] = useState<PostObj>({
    id: 0,
    user_id: 0,
    content: "ye",
    image: "ye",
    category: null,
    date_posted: "ye",
    likes: 0,
    comments: 0,
    user: {
      id: 0,
      username: "ab",
      email: "ab",
      password: "ab",
      real_name: null,
      bio: null,
      profile_pic: null,
      posts: 0,
    },
  });
  const [comment, setComment] = useState<string>();
  const commentRef = useRef<HTMLIonTextareaElement>(null);
  const [commentSection, setCommentSection] = useState<Array<Comment>>([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const formdata = new FormData();
    //const bla = authCtx?.user.id.toString()
    formdata.append("id", pId as string);
    axios.post(url, formdata).then((res) => {
      //console.log(res.data);
      //console.log(res.data.post);
      setData(res);
      setPost(res.data.post);
    });
  }, []);
  useEffect(()=>{
    const formdata = new FormData();
    formdata.append("id", pId as string);
    axios.post(url3, formdata).then((res) => {
      //console.log(res.data);
      //console.log(res.data.comment);
      //setData(res);
      setCommentSection(res.data.comment);
    });
  }, [commentSection]);
  const handleCommentChange = (event: CustomEvent) => {
    setComment(event.detail.value);
  };
  const handleSubmit = () => {
    const commentFinal = commentRef.current?.value;
    const formData = new FormData();
    formData.append("content", commentFinal as string);
    formData.append("user_id", authCtx?.user.id.toString() as string);
    formData.append("post_id", pId.toString() as string);
    console.log(formData);
    axios.post(url2, formData).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonNavLink routerDirection="forward" component={() => <Home />}>
            <IonButtons>
              <IonBackButton defaultHref="/home" />
            </IonButtons>
          </IonNavLink>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PostCard post={post} user={post.user} />
        <IonGrid className="ml-24 pr-24">
          <IonRow>
            <IonLabel>Post a comment here...</IonLabel>
          </IonRow>
          <IonRow>
            <IonItem
              style={{ "--background": "transparent", width: 5000 }}
              className="pt-5"
            >
              <IonAvatar slot="start">
                <img
                  src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}
                  alt="Profile Picture"
                  className="w-10 h-10"
                />
              </IonAvatar>
              <IonCol>
                <IonTextarea 
                  ref={commentRef}
                  placeholder="Your comment here..."
                />
              </IonCol>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonButton style={{ margin: 10 }} onClick={handleSubmit}>Submit</IonButton>
          </IonRow>
        </IonGrid>
        <IonList>
          {commentSection.map(comm => (
            <Comment user={comm.user} content={comm.content} date={comm.date_posted} likes={comm.likes} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Comments;
