import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [username, setUsername] = useState("");
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
        username,
        password
      );
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Container>
      <FormSection>
        <TextField
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Register
        </Button>
        <span>
          Already a user? <a href="#">Login</a>
        </span>
      </FormSection>
      <PicSection></PicSection>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PicSection = styled.div``;

export default Register;
