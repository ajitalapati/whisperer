import React from 'react'
import { ListItem, ListItemText, Typography } from '@mui/material';

interface BubbleProps {
  name: string;
  dialogue: string;
}

export default function Bubble({name, dialogue}: BubbleProps) {
  return (
    <ListItem>
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
