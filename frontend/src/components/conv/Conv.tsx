import {useContext, useEffect, useState, useRef} from 'react'
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
    timestamp?: Date;
}

export default function Conv() {
    const location = useLocation();
    const { conversee, imgURL, description } = location.state;
    const userImgURL = "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
    const [currentInput, setCurrentInput] = useState<string>("");
    const [user, setUser] = useState<string>("a modern day person");
    const [dia, setDia] = useState<ConvBubble[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { getSession } = useContext(AccountContext)

    useEffect(()=>{
        getSession().then((session: CognitoUserSession)=>{
            setUser(session.getIdToken().payload.name)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        const container = document.querySelector('.overflow-y-auto');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [dia]);

    const initLine: string = `The following is a conversation between ${user} and ${conversee}.`

    const sendClick = async () => {
        //send through string data from input
        const newUserInput = {
            name: user,
            text: currentInput,
            imgURL: userImgURL,
            timestamp: new Date()
        }
        const add = [newUserInput]
        setDia([...dia, newUserInput])
        const tempCurrInput = currentInput
        setCurrentInput("")
        const newInput: ConvBubble = {
            name: user,
            text: tempCurrInput,
            imgURL: userImgURL,
            timestamp: new Date()
        }
        setIsLoading(true)
        await hwService.bedrockContinue(user, conversee, description, [...dia, newInput]).then((data) => {
            add.push({
                name: conversee,
                text: data,
                imgURL: imgURL,
                timestamp: new Date()
            })
        })
        setDia([...dia, ...add])
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-6">
            <Card className="w-full max-w-4xl max-h-[90vh] space-y-6 p-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">{initLine}</h1>
                </div>
                
                <div className="space-y-4 h-[70vh] overflow-y-auto pr-4 scrollbar-hide">
                    {dia.map((x) => (
                        <Bubble 
                            key={`${x.name}-${x.text}-${x.timestamp?.getTime()}`} 
                            name={x.name} 
                            dialogue={x.text} 
                            imgURL={x.imgURL}
                            timestamp={x.timestamp}
                        />
                    ))}
                    {isLoading && (
                        <div className="flex items-start space-x-4 p-4">
                            <div className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden">
                                <img src={imgURL} alt={conversee} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-sm font-medium leading-none text-primary">{conversee}</p>
                                <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none">
                                    <div className="flex space-x-2">
                                        <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                                        <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                                        <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                        disabled={isLoading}
                    />
                    <Button 
                        onClick={sendClick}
                        className="h-12 px-6"
                        disabled={!currentInput.trim() || isLoading}
                    >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                    </Button>
                </div>
            </Card>
        </div>
    )
}