import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import cognitoService from '../../services/cognitoService';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Alert from '@mui/material/Alert';

interface SignUpProps{
  user: string;
}

export default function SignUp({user}: SignUpProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name: any = data.get("name");
    const emailUser: any = data.get("email");
    const pass: any = data.get("password");

    const userAttributes: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: "email",
        Value: emailUser
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: name
      })
    ]

    cognitoService.signUp(emailUser, pass, userAttributes, [], (err, data)=>{
        if (err) {
          console.log(err)
        }
        console.log(data)
    })
  };

  return (
    <>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up with Project Whisper
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              //value={user}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}