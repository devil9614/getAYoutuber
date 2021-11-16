import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import registerPoster from "../Assets/registerPoster.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 0.5,
      width: "100%",
    }}
  />
);

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
    <Container>
      <FormSection>
        <Header>Welcome</Header>
        <TextField
          placeholder="Email"
          value={email}
          style={{ margin: 10, background: "#CF806F", borderRadius: "1000px" }}
          background="#CF806F"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          placeholder="password"
          value={password}
          style={{ margin: 10, background: "#CF806F", borderRadius: "1000px" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ margin: 10 }}
        >
          Register
        </Button>
        <ColoredLine color={"black"} />
        <span style={{ padding: 10,cursor:"pointer" }} onClick={() => navigate("/login")}>
          Already have an account? <a style={{ color: "blue" }}>Login Now</a>
        </span>
      </FormSection>
      <PicSection>
        <img
          src={registerPoster}
          alt="register Poster"
          width="450px"
          height="auto"
        />
      </PicSection>
    </Container>
    <Footer/>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 100vw;
  height: 90vh;
  max-height: 90vh;
  overflow: hidden;
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .MuiOutlinedInput-root {
    height: 45px;
    border-radius: 50px;
    border: none;
    color: white;
  }
  .MuiButton-root {
    border-radius: 50px;
    background-color: #deb100;
    color: black;
  }
`;
const PicSection = styled.div`
  width: 450px;
  margin-left: 60px;
`;
const Header = styled.p`
  color: black;
  font-size: 2rem;
`;
export default Register;
