import { TextField } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'

const HomePageWithLogin = () => {
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
