import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AccountContext } from '../users/Account'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'

export default function AccountNav() {
    const [status, setStatus] = useState<boolean>(false);
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(() => {
                setStatus(true);
            })
            .catch(() => {
                setStatus(false);
            });
    }, [getSession]);

    const notSignedIn = (
        <Link to="/signin" className="no-underline">
            <Button
                variant="outline"
                className="rounded-sm border-primary/35 font-display text-sm tracking-wide text-foreground hover:bg-primary/10 hover:text-foreground"
            >
                Sign in
            </Button>
        </Link>
    );

    const signedIn = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-sm border-primary/35 hover:bg-primary/10"
                >
                    <User className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-sm" align="end" forceMount>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return status ? signedIn : notSignedIn;
}
