import { Avatar } from "@mui/material";
import { doc, getDoc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { db } from "../Firebase";
import LoadingPage from "./LoadingPage";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Email } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import styled from "styled-components";
const ProfilePage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  console.log(userId);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      //   const q = query(usersCollectionRef, where("catagory", "==", catagory));
      //   const querySnapshot = await getDocs(q);
      //   querySnapshot.docs.map((doc) => (console.log(doc.data(),doc.id)))
      //   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const docRef = doc(db, "users", userId);
      try {
        const docSnap = await getDoc(docRef);
        setUserDetails(docSnap.data());
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    };
    getData();
  }, []);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  console.log(userDetails);
  return (
    <div>
      <BlueScreen></BlueScreen>
      <ContentArea>
        <Avatar
          src={userDetails?.avatar}
          sx={{ height: 150, width: 150, border: 5, borderColor: "white" }}
        >
          {userDetails?.fullName[0]}
        </Avatar>
        <h2>{userDetails?.fullName}</h2>
        {userDetails?.catagory && (
          <h4>
            <i>
              {userDetails?.catagory} {"Youtuber"}
            </i>
          </h4>
        )}

        <p>About Me</p>
        <p>
          <i>{userDetails?.bio}</i>
        </p>
        <p>Connect Me here</p>
        <div style={{ display: "flex", gap: 10 }}>
          {userDetails?.ytLink && (
            <a href={userDetails?.ytLink} target="_blank">
              <YouTubeIcon
                sx={{ color: "red", height: 24, width: 24 }}
              ></YouTubeIcon>
            </a>
          )}
          {userDetails?.igLink && (
              <a href={userDetails?.igLink}><InstagramIcon sx={{ color: "blue" }}></InstagramIcon></a>
            
          )}
          {userDetails?.email && (
              <a href={`mailTo:${userDetails?.email}`}><MailOutlineIcon sx={{ color: "black" }}></MailOutlineIcon></a>
            
          )}
        </div>
      </ContentArea>
    </div>
  );
};

const BlueScreen = styled.div`
  position: absolute;
  width: 100vw;
  background-color: #5f3be3;
  height: 20vh;
`;
const ContentArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 13vh;
`;

export default ProfilePage;
