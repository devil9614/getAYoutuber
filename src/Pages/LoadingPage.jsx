import { CircularProgress } from "@mui/material"
import styled from "styled-components"

const LoadingPage = () => {
    return (
        <LoadingScreen>
            <CircularProgress/>
            <h2>GetAYoutuber</h2>
        </LoadingScreen>
    )
}

const LoadingScreen = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:20px;
`

export default LoadingPage
