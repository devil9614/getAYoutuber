import React,{useEffect} from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import { auth } from '../Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from '../Pages/LoadingPage'

const DashboardRoute = ({children}) => {
    const [user,loading,error] = useAuthState(auth)
    // const {user} = useUserAuth
    // console.log(user)
    // console.log(auth.currentUser)
    useEffect(() => {
        if(user){
            console.log(user)
        }   
        else{
            console.log(error,loading)
        }
    },[user,error,loading])
    if(!user){
        return <Navigate to = "/login"/>
    }
    if(loading){
        return <LoadingPage/>
    }
    return children
}

export default DashboardRoute
