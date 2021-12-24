import { Avatar, CircularProgress, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { auth, db, storage } from "../Firebase";
import Autocomplete from "react-google-autocomplete";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyB52w1QzyZDCk5IzyjLhEUAr5eJhB3IzCM";
const HomePageWithLogin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getData();
  }, []);
  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  
  console.log(auth.currentUser);
  return (
    <MainContainer>
      <Navbar />
      <div style={{ padding: 20 }}>
        <TextField type="text" placeholder="Search" />
        <Autocomplete
          apiKey={YOUR_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        />
        ;
        <form onSubmit={formHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload</button>
        </form>
      </div>
      <div style={{ width: "100vw" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ justifyContent: "center" }}
        >
          {users.map((user, i) => (
            <Grid item xs={3} key={i}>
              <UserCard>
                <Avatar src={user?.avatar}></Avatar>
                <p>{user?.fullName}</p>
                <p>{user?.catagory}</p>
                <p>{user?.location}</p>
              </UserCard>
            </Grid>
          ))}
        </Grid>
      </div>

      {loading && (
        <Box style={{ paddingTop: 20 }}>
          <CircularProgress />
        </Box>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #111;
`;

export default HomePageWithLogin;
