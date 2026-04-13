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
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { getSession } = useContext(AccountContext)

    useEffect(()=>{
        getSession().then((session: CognitoUserSession)=>{
            setUser(session.getIdToken().payload.name)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [dia]);

    const sendClick = async () => {
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
        <div className="relative flex min-h-full w-full flex-col items-center px-3 py-6 sm:px-6">
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-[min(100%,48rem)] -translate-x-1/2 bg-primary/5 blur-3xl dark:bg-primary/10"
                aria-hidden
            />
            <Card className="relative w-full max-w-4xl border-border/80 bg-card/95 shadow-2xl backdrop-blur-sm dark:bg-card/90">
                <div className="border-b border-border/60 bg-gradient-to-br from-muted/50 to-transparent px-5 py-6 text-center sm:px-8">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
                        In conversation
                    </p>
                    <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {conversee}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Speaking with <span className="text-foreground/90">{user}</span>
                    </p>
                </div>

                <div className="space-y-0 px-2 pb-4 pt-2 sm:px-4">
                    <div
                        ref={messagesContainerRef}
                        className="h-[min(70vh,36rem)] space-y-1 overflow-y-auto rounded-sm border border-border/40 bg-muted/20 px-1 py-3 dark:bg-muted/10"
                    >
                        {dia.map((x) => (
                            <Bubble
                                key={`${x.name}-${x.text}-${x.timestamp?.getTime()}`}
                                name={x.name}
                                dialogue={x.text}
                                imgURL={x.imgURL}
                                timestamp={x.timestamp}
                                isUser={x.name === user}
                            />
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 px-3 py-3 sm:gap-4 sm:px-4">
                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/30 ring-2 ring-primary/10 sm:h-11 sm:w-11">
                                    <img src={imgURL} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                                    <p className="text-sm font-semibold text-primary">{conversee}</p>
                                    <div className="inline-flex items-center gap-1.5 rounded-sm border border-border/60 bg-muted/50 px-4 py-3 dark:bg-muted/30">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/70" style={{ animationDelay: '0ms' }} />
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/70" style={{ animationDelay: '200ms' }} />
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/70" style={{ animationDelay: '400ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Input
                            autoFocus
                            placeholder="Write your message…"
                            value={currentInput}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendClick()
                                }
                            }}
                            onChange={(e) => {
                                setCurrentInput(e.target.value)
                            }}
                            className="h-12 flex-1 rounded-sm border-border/80 bg-background font-body text-base"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={sendClick}
                            className="h-12 shrink-0 rounded-sm px-8 font-display tracking-wide"
                            disabled={!currentInput.trim() || isLoading}
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Send
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
