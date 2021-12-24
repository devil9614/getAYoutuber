import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import registerPoster from "../Assets/registerPoster.png";
import Footer from "../Components/Footer";
import {ReactComponent as LoginSVG} from '../Assets/login.svg'
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      console.log("perfect login");
    }
    if (error) {
      console.log(error);
    }
  }, [loading, user, error]);
  const handleSubmit = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/")
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <MainContainer>
      <Toaster/>
      <LoginSVG style = {{position:"absolute",left:50}} className="svg"/>
      <MainScreen className="mainScreen">
        <BlueSection className="blueScreen"></BlueSection>
        <Container className="container">
          <Header className="heading">Welcome Back</Header>
          <SubHeading className="subHeading">Sign in to use GetAYoutuber</SubHeading>
          <FormSection className="formSection">
            <TextField
              variant="standard"
              className = "textInput"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="standard"
              className = "textInput"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a style={{ color: "#5F3BE3", cursor: "pointer" }}>
              Forget Password ?
            </a>
            <Button
              variant="contained"
              onClick={handleSubmit}
              className = "submitButton"
            >
              Log in
            </Button>
          </FormSection>
          <ColoredLine color={"black"} />
          <span>
            Don't have a account ?{" "}
            <a style={{ color: "#5F3BE3", cursor: "pointer" }} onClick={() => navigate("/register")}>Sign up</a>
          </span>
        </Container>
      </MainScreen>

      <Footer />
    </MainContainer>
  );
};

const MainContainer = styled.div`
.line{
  width:45vw;
}
@media only screen and (max-width: 970px) {
  .svg{
    display:none;
  }
}
@media only screen and (max-width: 540px) {
  .blueScreen{
    display:none;
  }
  .mainScreen,.container{
    width:100vw;
  }
  .heading, .subHeading, .formSection{
    width:90vw;
  }
  .line{
    width:90vw;
  }
}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const SubHeading = styled.div`
  width: 35vw;
  padding-bottom: 60px;
  margin-top:-40px;
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
    background-color: #5f3be3;
    color: #fff;
  }
  .textInput, .submitButton{
    width:30vw;
  }
  @media only screen and (max-width: 540px){
    .textInput, .submitButton{
      width:90vw;
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
export default Login;
