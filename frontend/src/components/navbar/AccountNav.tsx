import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AccountContext } from '../users/Account'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'

export default function AccountNav() {
    const [status, setStatus] = useState<Boolean>(false);
    const { getSession, logout } = useContext(AccountContext)

    useEffect(()=>{
        getSession().then((session: CognitoUserSession)=>{
            setStatus(true)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const notSignedIn = (
        <Link to="/signin">
            <Button variant="ghost">
                Sign In
            </Button>
        </Link>
    );

    const signedIn = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={logout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return status ? signedIn : notSignedIn;
}
