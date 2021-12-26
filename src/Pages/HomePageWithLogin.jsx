import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { auth, db, storage } from "../Firebase";
import Autocomplete from "react-google-autocomplete";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import BlueTick from "../Assets/blueTick.png";
import { Navigate, useNavigate } from "react-router-dom";
const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyB52w1QzyZDCk5IzyjLhEUAr5eJhB3IzCM";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 12,
  height: 12,
}));

const Catagories = [
  "Animation",
  "ASMR",
  "Beauty",
  "Comedy",
  "Conspiracy",
  "Cooking",
  "Design/Art",
  "DIY",
  "Educational",
  "Family",
  "Fashion",
  "Gaming",
  "Health and Fitness",
  "Lifestyle",
  "Music and Dance",
  "Pranks and Challanges",
  "Sports",
  "Technical",
  "Travel",
  "Vlogger",
];

const HomePageWithLogin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");
  const [progress, setProgress] = useState(0);
  const [catagory, setCatagory] = useState("");
  const navigate = useNavigate()
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionRef);
      const q = query(usersCollectionRef, where("catagory", "==", catagory));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => (console.log(doc.data(),doc.id)))
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getData();
  }, [catagory]);
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
  const handleNaviagateUser = (userId) =>{
    navigate(`/user/${userId}`)
  }
  console.log(catagory);
  return (
    <MainContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>

      <div
        style={{
          padding: 20,
          marginTop: "12vh",
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap:"wrap"
        }}
      >
        <TextField
          type="text"
          placeholder="Search"
          sx={{ height: 50, width: 200 }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
            <Select
              sx={{ height: 50, width: 200 }}
              value={catagory}
              label="Catagory"
              onChange={(e) => setCatagory(e.target.value)}
            >
              {Catagories.map((catagory) => (
                <MenuItem value={catagory} key={catagory}>
                  {catagory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{ height: 50, width: 100 }}
          style={{ backgroundColor: "#5f3be3", color: "white" }}
        >
          Search
        </Button>
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
                <Card
                sx={{ width:250,height:200 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
                onClick={() => handleNaviagateUser(user.id)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          user?.verified ? (
                            <SmallAvatar
                              alt="Remy Sharp"
                              src={BlueTick}
                              sx={{ height: 22, width: 22 }}
                            />
                          ) : null
                        }
                      >
                        <Avatar
                          src={user?.avatar}
                          sx={{ height: 80, width: 80 }}
                        >
                          {user?.fullName[0]}
                        </Avatar>
                      </Badge>
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      {user?.fullName}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      align="center"
                    >
                      {user?.location}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      align="center"
                    >
                      <i>{user?.catagory}{" "}{user?.catagory?"Youtuber":""}</i>
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {user?.bio}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #f3f3f3;
  min-height: 100vh;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #111;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0px;
`;

export default HomePageWithLogin;
