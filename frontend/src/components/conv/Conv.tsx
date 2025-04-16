import React, {useContext, useEffect, useState} from 'react'
import Bubble from './Bubble'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import hwService from "../../services/hwService";
import { useLocation } from "react-router-dom";
import { AccountContext } from '../users/Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Card } from "@/components/ui/card";

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
        <div className="flex flex-col items-center w-full p-4 md:p-6">
            <Card className="w-full max-w-4xl space-y-6 p-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">{initLine}</h1>
                </div>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                    {dia.map((x) => (
                        <Bubble key={`${x.name}-${x.text}`} name={x.name} dialogue={x.text} imgURL={x.imgURL} />
                    ))}
                </div>

                <div className="flex gap-2 mt-4">
                    <Input
                        autoFocus
                        placeholder="Write your message..."
                        value={currentInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendClick()
                            }
                        }}
                        onChange={(e) => {
                            setCurrentInput(e.target.value)
                        }}
                        className="flex-1 h-12 text-base"
                    />
                    <Button 
                        onClick={sendClick}
                        className="h-12 px-6"
                        disabled={!currentInput.trim()}
                    >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                    </Button>
                </div>
            </Card>
        </div>
    )
}