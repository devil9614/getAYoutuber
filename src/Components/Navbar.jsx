import { Avatar } from '@mui/material'
import React from 'react'
import Logo from "../Assets/Untitled.png"
import styled from "styled-components"
const Navbar = () => {
    return (
        <NavbarContainer>
            <RightSection>
                <img src = {Logo} alt = "logo" width = "80%"/>
            </RightSection>
            <LeftSection>
                <Options>Chats</Options>
                <UserSection>
                    <Avatar height = "20px" />
                    <span style ={{paddingLeft:"10px",fontWeight:"lighter"}}>Username</span>
                </UserSection>
            </LeftSection>
        </NavbarContainer>
    )
}
const UserSection = styled.div`
    display:flex;
    align-items:center;
    .MuiAvatar-root{
        height:30px;
        width:30px;
    }
`
const LeftSection = styled.div`
    display:flex;
    align-items:center;
`
const RightSection = styled.div`
    display:flex;
    align-items:center;
`
const NavbarContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px 20px 10px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const Options = styled.span`
    margin-right:15px;
`
export default Navbar
