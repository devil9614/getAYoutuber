import React from "react";
import Logo from "../Assets/Untitled.png";

const Footer = () => {
  return (
    <div
      style={{
        height: "10vh",
        maxHeight:"10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
    </div>
  );
};

export default Footer;
