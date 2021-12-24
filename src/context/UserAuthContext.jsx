import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

const UserAuthContext = createContext()

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState({});
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          console.log("Auth", currentuser);
          setUser(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    
    return <UserAuthContext.Provider value = {{user}}>{children}</UserAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(UserAuthContext)
}