import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Logo from "../Assets/Untitled.png";
import Background from "../Assets/comingsoonpage4.jpg";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
        <Box sx={{ width: '100%', mr: 1,height:10 }}>
          <LinearProgress color = "success" variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };  

const ComingSoonPage = () => {
    const [progress, setProgress] = useState(10)

    return (
    <Main className="App">
      <img src={Logo} alt="Logo" />
      <h1>Coming Soon...</h1>
      <Box sx={{ width: '40%' }}>
      <LinearProgressWithLabel value={progress} height = {10} />
    </Box>
    </Main>
  );
};
const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-image:url(${Background});
  background: linear-gradient(to bottom right, #fc5c7d, #6a82fb);
  background-image-size: cover;
`;
export default ComingSoonPage;
