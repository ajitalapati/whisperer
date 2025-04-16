import React, {useContext, useEffect, useState} from 'react'
import Bubble from './Bubble'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import hwService from "../../services/hwService";
import { useLocation } from "react-router-dom";
import { AccountContext } from '../users/Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export interface ConvBubble{
    name: string;
    text: string;
    imgURL: string;
}

export default function Conv() {
    const location = useLocation();
    const { conversee, imgURL } = location.state;
    const userImgURL = "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
    const [currentInput, setCurrentInput] = useState<string>("");
    const [user, setUser] = useState<string>("a modern day person");
    const [dia, setDia] = useState<ConvBubble[]>([]);
    const { getSession } = useContext(AccountContext)

    useEffect(()=>{
        getSession().then((session: CognitoUserSession)=>{
            setUser(session.getIdToken().payload.name)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const initLine: string = `The following is a conversation between ${user} and ${conversee}.`

    const sendClick = async () => {
        //send through string data from input
        const newUserInput = {
            name: user,
            text: currentInput,
            imgURL: userImgURL
        }
        const add = [newUserInput]
        setDia([...dia, newUserInput])
        const tempCurrInput = currentInput
        setCurrentInput("")
        const newInput: ConvBubble = {
            name: user,
            text: tempCurrInput,
            imgURL: userImgURL
        }
        await hwService.continue(user, conversee, [...dia, newInput]).then((data) => {
            add.push({
                name: conversee,
                text: data,
                imgURL: imgURL
            })
        })
        await hwService.mark1(user, conversee, [...dia, newInput])
        setDia([...dia, ...add])
    }

    return (
        <div className="flex flex-col items-center w-full p-5">
            <div className="w-[60%] space-y-4">
                <h1 className="text-2xl font-semibold">{initLine}</h1>
                
                <div className="space-y-4">
                    {dia.map((x) => (
                        <Bubble key={`${x.name}-${x.text}`} name={x.name} dialogue={x.text} imgURL={x.imgURL} />
                    ))}
                </div>

                <div className="flex gap-2">
                    <Input
                        autoFocus
                        placeholder="Write a message..."
                        value={currentInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendClick()
                            }
                        }}
                        onChange={(e) => {
                            setCurrentInput(e.target.value)
                        }}
                        className="flex-1"
                    />
                    <Button 
                        onClick={sendClick}
                        className="h-10"
                    >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}