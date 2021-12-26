import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Dialog,
  Slide,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, createUserDocument, db, storage } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import registerPoster from "../Assets/registerPoster.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { addData } from "../Firebase";
import { ReactComponent as SignUpSVG } from "../Assets/signup.svg";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otherInfo, setOtherInfo] = useState({
    fullName: "",
    ytLink: "",
    bio: "",
    igLink: "",
    isYoutuber: false,
    location: "",
    catagory: "",
    createdAt: new Date(),
    avatar: "",
  });
  const [formPage, setFormPage] = useState(1);
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [rawFile, setRawFile] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      console.log("perfect register");
    }
    if (error) {
      console.log(error);
    }
  }, [loading, user, error]);
  const handleSubmit = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      // await uploadFiles({files:rawFile,userId:user.uid});
      const userDoc = doc(db,"users",user.uid)
      await setDoc(userDoc,otherInfo)
      // await getData(rawFile)
    } catch (err) {
      toast(err.message);
      console.log(err.message);
    }
  };
  // const getData = async (files) => {
  //   // setLoading(true);
  //   const up = await uploadFiles(files)
  //   const usersCollectionRef = collection(db, "users");
  //   const data = await getDocs(usersCollectionRef);
  //   console.log(data)
  //   // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   // setLoading(false);
  // };
   const handleChange = (e) => {
    const { name, value } = e.target;
    setOtherInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    setRawFile(e.target.files[0]);
    const pre = URL.createObjectURL(e.target.files[0]);
    setPreview(pre);
  };
  const handleUploadImage = async () => {
    //
    if (!rawFile) return;
    // setLoading(true)
    const sotrageRef = ref(storage, `files/${rawFile.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, rawFile);

    // const uploadFile = storage.ref("users",file.name).put(file)
    // uploadFile.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const prog = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //   },
    //   (err) => {
    //     console.log(err)
    //   },
    //   () => {
    //     storage.ref("users").child(file.name).getDownloadURL().then((imageURL) => {
    //       db.collection("users").doc(userId).set({
    //         fullName:otherInfo.fullName,
    //         ytLink:otherInfo.ytLink,
    //         bio:otherInfo.bio,
    //         igLink:otherInfo.igLink,
    //         isYoutuber:otherInfo.isYoutuber,
    //         location:otherInfo.location,
    //         catagory:otherInfo.catagory,
    //         createdAt:new Date(),
    //         avatar:imageURL
    //       })
    //     })
    //   }
    // )

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setOtherInfo((prevState) => ({
            ...prevState,
            avatar: downloadURL,
          }));
          setOpen(false)
        });
      }
    );
    
  };
  console.log(otherInfo)
  return (
    <MainContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogTitle >
          <div style = {{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <i style = {{paddingRight:50}}>Upload Your Profile Picture</i>
          <CloseIcon onClick = {handleClose} style = {{cursor:"pointer"}}></CloseIcon>
          </div>
        </DialogTitle>
        <DialogContent>
          <Fade in={open}>
          <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Avatar src={preview} sx={{ width: 80, height: 80,marginBottom:"30px" }}></Avatar>
                <label className="custom-file-upload" style={{cursor:"pointer"}}>
                  <input
                    type="file"
                    accept="images/*"
                    hidden
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <ImageUploadButton className="fa fa-cloud-upload">{!preview?"Select Profile Picture":"Change Profile Picture"}</ImageUploadButton>
                </label>
              </div>
        </Fade>
        </DialogContent>
        <DialogActions>
                {preview?
                <>
                <Button variant ="outlined" color = "info" >Cancel</Button>
                <Button variant = "contained" color = "primary" onClick = {handleUploadImage}>Upload</Button>
                </>:null}
        </DialogActions>
      </Dialog>
      <Toaster position="top-center" reverseOrder={false} />
      <SignUpSVG style={{ position: "absolute", left: 25 }} className="svg" />
      <MainScreen className="mainScreen">
        <BlueSection className="blueScreen"></BlueSection>
        <Container className="container">
          <Header className="heading">Welcome</Header>
          <SubHeading className="subHeading">
            Become a part of this great community
          </SubHeading>
          {formPage === 1 && (
            <FormSection className="formSection">
              <TextField
                variant="standard"
                type="email"
                className="textInput"
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant="standard"
                className="textInput"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <a style={{ color: "#5F3BE3", cursor: "pointer" }}>
              Forget Password ?
            </a> */}
              <Button
                variant="contained"
                onClick={() => setFormPage(2)}
                className="submitButton"
                style={{ backgroundColor: "#5f3be3" }}
                disabled={email && password ? false : true}
              >
                Next
              </Button>
            </FormSection>
          )}
          {formPage === 2 && (
            <FormSection>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor:"pointer"
                }}
                onClick = {handleOpen}
              >
                <Avatar src={preview} sx={{ width: 80, height: 80 }}></Avatar>
                <i>click here to upload image</i>
                {/* <label className="custom-file-upload" style={{cursor:"pointer"}}>
                  <input
                    type="file"
                    accept="images/*"
                    hidden
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <i className="fa fa-cloud-upload"/> Upload Profile Picture
                </label> */}
              </div>
              <TextField
                // value = {}
                variant="standard"
                type="text"
                className="textInput"
                label="Full Name"
                name="fullName"
                onChange={handleChange}
                required
              />
              <TextField
                variant="standard"
                className="textInput"
                label="About You"
                onChange={handleChange}
                name="bio"
                required
              />
              <TextField
                variant="standard"
                type="url"
                className="textInput"
                label="Instagram Link"
                onChange={handleChange}
                name="igLink"
              />
              <TextField
                variant="standard"
                type="url"
                className="textInput"
                label="Youtube Channel Link"
                disabled={otherInfo?.isYoutuber ? false : true}
                onChange={handleChange}
                name="ytLink"
                required={otherInfo?.isYoutuber ? true : false}
              />
              <Box sx={{ minWidth: 120 }}>
          <FormControl >
            <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
            <Select
              sx={{height:50,width:150}}
              value = {otherInfo.catagory}
              label="Catagory"
              name="catagory"
              onChange={handleChange}
              className="catagory"
              required
              disabled={otherInfo?.isYoutuber ? false : true}
            >
              {Catagories.map((catagory) => (
                <MenuItem value={catagory} key={catagory} sx = {{color:"black"}}>
                  {catagory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
              <FormGroup style={{ alignItems: "flex-end" }}>
                <FormControlLabel
                  label="Are you a youtuber ? "
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(e) =>
                        setOtherInfo((prevState) => ({
                          ...prevState,
                          isYoutuber: e.target.checked,
                        }))
                      }
                    />
                  }
                />
              </FormGroup>
              <Button
                variant="contained"
                onClick={() => setFormPage(1)}
                className="submitButton"
                style={{ backgroundColor: "#494949" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() =>{
                  if(otherInfo.fullName && otherInfo.bio && ((otherInfo.isYoutuber)?(otherInfo.ytLink && otherInfo.catagory):true)){
                    handleSubmit()
                  }
                  else{
                    console.log(otherInfo.fullName && otherInfo.bio && ((otherInfo.isYoutuber)?(otherInfo.ytLink && otherInfo.catagory):true))
                  }
                }}
                className="submitButton"
                style={{ backgroundColor: "#5f3be3" }}
              >
                CREATE
              </Button>
            </FormSection>
          )}
          <ColoredLine color={"black"} />
          <span>
            Already a Member ?{" "}
            <a
              style={{ color: "#5F3BE3", cursor: "pointer", paddingBottom: 20 }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </a>
          </span>
        </Container>
      </MainScreen>

      <Footer />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  .line {
    width: 45vw;
  }
  @media only screen and (max-width: 970px) {
    .svg {
      display: none;
    }
  }
  @media only screen and (max-width: 540px) {
    .blueScreen {
      display: none;
    }
    .mainScreen,
    .container {
      width: 100vw;
    }
    .heading,
    .subHeading,
    .formSection {
      width: 90vw;
    }
    .line {
      width: 90vw;
    }
  }
`;

const ImageUploadButton = styled.span`
  padding:10px;
  background-color:#5f3be3;
  color:#fff;
  margin-top:20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60vw;
  height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const SubHeading = styled.div`
  width: 35vw;
  padding-bottom: 60px;
  margin-top: -40px;
`;
const BlueSection = styled.div`
  background-color: #5f3be3;
  width: 40vw;
  height: 100vh;
`;
const MainScreen = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  .MuiOutlinedInput-root {
    width: 40vw;
    border: none;
    color: white;
  }
  .MuiButton-root {
    color: #fff;
  }
  .textInput,
  .submitButton,
  .catagory {
    width: 30vw;
  }
  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase,
  .Mui-checked {
    backgruond-color: #5f3be3;
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input, .MuiSelect-select {
    color:black;
  }
  @media only screen and (max-width: 540px) {
    .textInput,
    .submitButton,
    .catagory {
      width: 90vw;
    }
  }
`;
const Header = styled.p`
  width: 35vw;
  color: #5f3be3;
  font-size: 45px;
`;
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: "black",
      height: 0.2,
      margin: 30,
    }}
    className="line"
  />
);
export default Register;
