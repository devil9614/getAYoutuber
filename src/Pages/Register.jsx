import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, createUserDocument, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import registerPoster from "../Assets/registerPoster.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { addData } from "../Firebase";
import { ReactComponent as SignUpSVG } from "../Assets/signup.svg";
import { addDoc, doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

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
    createdAt: "",
  });
  const [formPage, setFormPage] = useState(1);
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
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
      // const userDoc = doc(db,"users",user.uid)
      await setDoc(doc(db, "users", user.uid), otherInfo);
    } catch (err) {
      toast(err.message);
      console.log(err.message)
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtherInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <MainContainer>
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
                label="Youtube Channel Link"
                disabled={otherInfo?.isYoutuber ? false : true}
                onChange={handleChange}
                name="ytLink"
                required={otherInfo?.isYoutuber ? true : false}
              />
              <TextField
                variant="standard"
                type="url"
                className="textInput"
                label="Instagram Link"
                onChange={handleChange}
                name="igLink"
              />
              <FormGroup>
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
                onClick={handleSubmit}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  justify-content: center;
  .MuiOutlinedInput-root {
    height: 45px;
    width: 40vw;
    border: none;
    color: white;
  }
  .MuiButton-root {
    color: #fff;
  }
  .textInput,
  .submitButton {
    width: 30vw;
  }
  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase,
  .Mui-checked {
    backgruond-color: #5f3be3;
  }
  @media only screen and (max-width: 540px) {
    .textInput,
    .submitButton {
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
