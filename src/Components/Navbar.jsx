import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../Assets/Untitled.png";
import styled from "styled-components";
import { useRef } from "react";
import { auth, db } from "../Firebase";
import { collection, getDocs,doc ,getDoc} from "firebase/firestore";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [user, setUser] = useState();
  const usersCollectionRef = doc(db, "users",auth.currentUser.uid);
  useEffect(() => {
    const getUser = async () => {
        const userSnap = await getDoc(usersCollectionRef)
        if(userSnap.exists()){
            setUser(userSnap.data())
        }
        else{
            console.log("No Data")
        }
    }
    getUser()
  },[])
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleSignOut = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    auth.signOut()
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
//   useEffect(() => {
//     const getData = async () => {
//       const data = await getDocs(usersCollectionRef);
//       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
//     // getData();
//   }, []);
  return (
    <NavbarContainer>
      <RightSection>
        <img src={Logo} alt="logo" width="80%" />
      </RightSection>
      <LeftSection>
        <Options>Chats</Options>
        <UserSection>
          <Avatar height="20px" />
          <Stack direction="row" spacing={2}>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {user?.fullName || "Profile"}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack>
        </UserSection>
      </LeftSection>
    </NavbarContainer>
  );
};
const UserSection = styled.div`
  display: flex;
  align-items: center;
  .MuiAvatar-root {
    height: 30px;
    width: 30px;
  }
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: space-between;
  padding-top: 7px;
  padding-bottom: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color:#ffffff;
`;
const Options = styled.span`
  margin-right: 15px;
`;
export default Navbar;
