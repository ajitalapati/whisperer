import React, { useContext } from 'react'
import { Grid, Typography, Button, Input } from '@mui/material'
import { constants } from '../constants'
import { Link } from 'react-router-dom'
import { AccountContext } from './users/Account'

export default function LandingPage({setUserCallback}: any) {

    const { getUserAttributes } = useContext(AccountContext); 
    getUserAttributes()
    return (
        <>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={6}>
                <Grid item>
                    <Typography component="h2" variant="h2" align="center" color="textPrimary">
                        Welcome to Project Whisper
                    </Typography>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary">
                        Experience History Through Conversation.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography style={{width:"60%", margin: "auto"}} component="h1" variant="body1" align="center" color="textPrimary" justifyContent="center">
                        HW is a project that attempts to allow modern day people to converse with historical figures of the past. Built on top of OpenAI, HW hopes to display the powers of AI and how it can be used to enhance certain experiences. 
                        This project serves as a small example of what can be built around up and coming, public AI models. 
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>
                        To begin, please enter your name:
                    </Typography>
                </Grid>
                <Grid item>
                    <Input placeholder="What's your name?" style={{textAlign:"center"}} onChange={(e)=>{
                        setUserCallback(e.target.value)
                    }}/>
                </Grid>
                <Grid item>
                    <Link to="/options" style={{textDecoration: 'none'}}>
                        <Button variant="contained" style={{backgroundColor: constants.styleColors.mainColor, padding:"10px 50px 10px 50px"}}>Start Talking</Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}
