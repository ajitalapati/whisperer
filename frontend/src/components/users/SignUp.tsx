import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cognitoService from '../../services/cognitoService';
import CustomAlert from './CustomAlert';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function SignUp() {
  const [alertList, setAlertList] = useState<string[]>([]);
  const navigate = useNavigate();

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

    cognitoService.signUp(emailUser, pass, userAttributes, [], (err, data) => {
      if (err) {
        console.log(err)
        setAlertList([...alertList, JSON.stringify(err)])
      } else {
        console.log(data)
        navigate("/signin");
        window.location.reload();
      }
    })
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {alertList.map((message: string) => {
        return <CustomAlert message={message} />
      })}
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-primary p-2">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Sign up with Project Whisper</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}