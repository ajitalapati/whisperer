import React, { useContext, useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { AccountContext } from '../users/Account'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AccountNav() {
    const [status, setStatus] = useState<Boolean>(false);
    const { getSession, logout } = useContext(AccountContext)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogoutClick = () => {
        setAnchorEl(null);
        logout();
        window.location.reload();
    };

    useEffect(()=>{
        getSession().then((session: CognitoUserSession)=>{
            console.log("Session", session)
            setStatus(true)
        })
    }, [])

    const notSignedIn = (
        <Link to="/signin" style={{textDecoration: 'none'}}>
            <Button key={'sign in'} sx={{ color: '#fff' }}>
                Sign In
            </Button>
        </Link>
    );

    const signedIn = (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon style={{color: 'white'}}/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </>
      );

    if (!status){
        return notSignedIn
    } else {
        return signedIn
    }
}
