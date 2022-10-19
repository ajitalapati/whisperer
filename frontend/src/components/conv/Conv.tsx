import React, {useState, useEffect} from 'react'
import Bubble from './Bubble'
import { TextField, List, Button, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import hwService from "../../services/hwService";

export default function Conv() {
    const [currentInput, setCurrentInput] = useState<string>("");
    const [user, setUser] = useState<string>("Ajit Alapati");
    const [conversee, setConversee] = useState<string>("Julius Caesar");
    const initLine: string = "The following is a conversation between ".concat(user).concat(" and ").concat(conversee).concat(".");
    const [conv, setConv] = useState<string[]>([initLine]);

    const sendClick = async () => {
        //send through string data from input
        const add = [currentInput]
        setConv([...conv, currentInput])
        const tempCurrInput = currentInput
        setCurrentInput("")
        await hwService.continueConv(user, conversee, [...conv, tempCurrInput]).then((data) => {
            add.push(data)
        })
        setConv([...conv, ...add])
    }
    const map = [user, conversee];
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
                        conv.slice(1).map((x: string, i:number) => {
                            return <Bubble name={map[i%2]} dialogue={x}/>;
                        })
                        }
                    </List>
                </Grid>  
    
                <Grid container spacing={0.5} justifyContent="flex-end">
                    <Grid item xs={8.8}>
                        <TextField 
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