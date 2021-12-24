import React, {useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../Firebase'
import {Navigate} from 'react-router-dom'
import LoadingPage from '../Pages/LoadingPage'



const LoginRoute = ({children}) => {
    const [user,loading,error] = useAuthState(auth)
    useEffect(() => {
        if(user){
            console.log(user)
        }
        if(error){
            console.error(error)
        }
    }, [user,error])
    if(user){
        return <Navigate to = "/"/>
    }
    if(loading){
        return <LoadingPage/>
    }
    console.log(user,loading,error)
    return children
}

export default LoginRoute
