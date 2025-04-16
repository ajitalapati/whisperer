import React, {createContext} from 'react'
import Pool from '../../services/cognitoService';
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

interface AccountContextType {
    authenticate: (Username: string, Password: string) => Promise<CognitoUserSession>;
    getSession: () => Promise<CognitoUserSession>;
    logout: () => void;
}

const AccountContext = createContext<AccountContextType>({
    authenticate: async () => { throw new Error('Not implemented'); },
    getSession: async () => { throw new Error('Not implemented'); },
    logout: () => {}
});

interface AccountProps {
    children: React.ReactNode;
}

const Account = (props: AccountProps) => {
    const getSession = async (): Promise<CognitoUserSession> => {
        return await new Promise<CognitoUserSession>((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err: Error | null, session: CognitoUserSession) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject(new Error('No user found'));
            }
        });
    };

    const authenticate = async (Username: string, Password: string): Promise<CognitoUserSession> => {
        return await new Promise<CognitoUserSession>((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool
            });
            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    resolve(data);
                },
                onFailure: (err) => {
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    resolve(data);
                },
            });
        });
    };

    const logout = (): void => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };