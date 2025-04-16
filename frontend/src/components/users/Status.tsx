import { useContext, useState, useEffect } from 'react'
import { AccountContext } from './Account'
import { Button } from "@/components/ui/button";

export default function Status() {
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

    return (
        <div className="flex items-center justify-center p-4">
            {status ? (
                <Button variant="outline" onClick={logout}>
                    Logout
                </Button>
            ) : (
                <span className="text-muted-foreground">Please Login</span>
            )}
        </div>
    );
}
