import React, {useState} from 'react'
import Bubble from './Bubble'
import { TextField, List, Button, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import hwService from "../../services/hwService";
import { useLocation } from "react-router-dom";

interface ConvProps{
    user: string;
}

export interface ConvBubble{
    name: string;
    text: string;
    imgURL: string;
}

export default function Conv({user}: ConvProps) {
    const location = useLocation();
    const { conversee, imgURL } = location.state;
    const userImgURL = "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
    const [currentInput, setCurrentInput] = useState<string>("");
    const initLine: string = `The following is a conversation between ${user} and ${conversee}.`
    const [dia, setDia] = useState<ConvBubble[]>([]);

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
        setDia([...dia, ...add])
    }
    const map = [user, conversee];
    const imgOption = ["https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png", imgURL];
    return (
        <>
        <div
            style={{
            display: 'flex',
            position: "absolute",
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        }}>
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="left"
                justifyContent="left"
                style={{ minHeight: '100vh', width:"60%" }}
            >
                <Grid item>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: '3px' }}
                    >{initLine}</Typography>
                    
                </Grid>
                <Grid item xs={11}>          
                    <List sx={{ bgcolor: 'background.paper'}}>
                    {
                        dia.map((x) => {
                            return <Bubble name={x.name} dialogue={x.text} imgURL={x.imgURL}></Bubble>
                        })
                    }
                    </List>
                </Grid>  
    
                <Grid container spacing={0.5} justifyContent="flex-end">
                    <Grid item xs={8.8}>
                        <TextField 
                            autoFocus
                            id="outlined-basic" 
                            label="Write a message..." 
                            variant="outlined" fullWidth
                            value = {currentInput}
                            onKeyDown = {(e) => {
                                if(e.key === 'Enter'){
                                    sendClick()
                                 }
                            }}
                            onChange = {(e) => {
                                setCurrentInput(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button className = {"sendButton"} variant="contained" endIcon={<SendIcon />} style={{height: '100%'}} onClick={sendClick}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        </>
  )
}