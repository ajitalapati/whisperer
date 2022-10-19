import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export interface OptionProps {
    name: string;
    imgURL: string;
    description: string;
}

export default function Option({name, imgURL, description}: OptionProps) {
  return (
    <Card sx={{ maxWidth: 370 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imgURL}
          alt={name}
        />
        <CardContent style={{overflowY: "scroll", height: "170px"}}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
