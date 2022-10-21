import React from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

interface BubbleProps {
  name: string;
  imgURL: string;
  dialogue: string;
}

export default function Bubble({name, imgURL, dialogue}: BubbleProps) {
  return (
    <ListItem>
      <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imgURL} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >
                {dialogue}
            </Typography>
        }
    />
    </ListItem>
  )
}
