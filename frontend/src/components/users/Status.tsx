import { CognitoUserSession } from 'amazon-cognito-identity-js';
import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './Account'

export default function Status() {
    const [status, setStatus] = useState<Boolean>(false);
    const { getSession, logout } = useContext(AccountContext)

    useEffect(()=>{
        getSession().then((session: CognitoUserSession)=>{
            console.log("Session", session)
            setStatus(true)
        })
    }, [])

  return (
    <div>
        {status ? <button onClick={logout}>Logout</button> : "Please Login"}
    </div>
  )
}
