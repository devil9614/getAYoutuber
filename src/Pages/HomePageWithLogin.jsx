import { TextField } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { db } from '../Firebase'

const HomePageWithLogin = () => {
    const [users,setUsers] = useState([])
    const usersCollectionRef = collection(db,"users")
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
        }
        getData()
    },[])
    console.log(users)
    return (
        <div>
            <Navbar/>
            <div>
                <TextField type = "text" placeholder = "Search" />
                <TextField type = "text" placeholder = "Location" />
            </div>
            <div>
                User Section
            </div>
        </div>
    )
}

export default HomePageWithLogin
