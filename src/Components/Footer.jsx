import React from "react";
import styled from "styled-components";
import Logo from "../Assets/Untitled.png";

const Footer = () => {
  return (
    <MainContainer
    >
      <div
        style={{
          display: "flex",
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <img src={Logo} alt="Logo" width = "40%" /> */}
        <p style ={{fontSize:"0.8rem"}}>Made With ❤️ by Sujan</p>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
height: 10vh;
max-height:10vh;
display: flex;
justify-content: center;,
align-items: center;
display:none;
@media only screen and (max-width: 540px){
  display:block;
}
`

export default Footer;
