import React, {createContext} from 'react'
import Pool from '../../services/cognitoService';
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

const AccountContext = createContext<any>({
    authenticate: (Username: string, Password: string) => Promise<CognitoUserSession>,
    getSession: () => Promise<CognitoUserSession>
});

const Account = (props: any) => {
    const getSession = async ()=>{
        return await new Promise<CognitoUserSession>((resolve, reject)=>{
            const user: CognitoUser|null = Pool.getCurrentUser();
            console.log(user)
             if (user) {
                user.getSession((err: Error|null, session: CognitoUserSession)=>{
                    if(err){
                        reject(err)
                    } else {
                        resolve(session)
                    }
                })
             } else{
                reject()
             }
        })  
    }
    const authenticate = async (Username: string, Password: string )=>{
        return await new Promise<CognitoUserSession>((resolve, reject)=>{
            const user = new CognitoUser({
                Username,
                Pool
            })
            const authDetails = new AuthenticationDetails({
                Username,
                Password
            })
            user.authenticateUser(authDetails, {
                onSuccess: (data)=>{
                    resolve(data);
                },
                onFailure: (err)=>{
                    reject(err);
                },
                newPasswordRequired: (data)=>{
                    resolve(data);
                },
            })
        });
    }
    const logout = ()=>{
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut()
        }
    }
     return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
     )
};

export {Account, AccountContext};