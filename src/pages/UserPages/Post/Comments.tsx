import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonTextarea } from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext, PostObj } from "../../../components/context/AuthContext";
import Header from "../../../components/Header";
import PostCard2 from "../../../components/PostCard2";

const Comments: React.FC = () => {
    const pId = useParams<{postId: string}>().postId;
    const url = "http://localhost/blocknest/select_post.php";
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
        user: {id: 0,
            username: "ab",
            email: "ab",
            password: "ab",
            real_name: null,
            bio: null,
            profile_pic: null,
            posts: 0}
      });
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        const formdata = new FormData();
        //const bla = authCtx?.user.id.toString()
        formdata.append('id', pId as string);
        axios.post(url, formdata).then(res => {
            console.log(res.data);
            console.log(res.data.post);
            setData(res);
            setPost(res.data.post);
        });
      }, []);
    return(
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent>
                <PostCard2 post={post} user={post.user} />
                <IonGrid className="ml-24 pr-24">
                    <IonRow>
                        <IonLabel>Post a comment here...</IonLabel>
                    </IonRow>
                    <IonRow>
                    <IonItem style={{ "--background": "transparent", width: 5000 }} className="pt-5">
                        <IonAvatar slot="start">
                        <img src={`http://localhost/blocknest/${authCtx?.user.profile_pic}`}/>
                        </IonAvatar>
                        <IonCol>
                        <IonTextarea />
                        </IonCol>
                    </IonItem>
                    </IonRow>
                    <IonRow>
                        <IonButton style={{margin: 10}}>Submit</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Comments;