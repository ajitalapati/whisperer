import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { constants } from '../constants'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <>
    <Grid container direction="column" alignItems="center" justifyContent="left" spacing={4}>
        <Grid item>
            <Typography component="h2" variant="h2" align="center" color="textPrimary">
                Welcome to Project Whisper
            </Typography>
            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                A way to converse with History's greatest minds.
            </Typography>
        </Grid>
        <Grid item>
            <Link to="/options" style={{textDecoration: 'none'}}>
                <Button variant="contained" style={{backgroundColor: constants.styleColors.mainColor, padding:"10px 50px 10px 50px"}}>Let's do it</Button>
            </Link>
        </Grid>
    </Grid>
    </>
  )
}
