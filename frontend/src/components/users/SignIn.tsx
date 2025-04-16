import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AccountContext } from './Account';
import { useContext, useState } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import CustomAlert from './CustomAlert';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function SignIn() {
  const { authenticate } = useContext(AccountContext);
  const [alertList, setAlertList] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailUser: any = data.get("email");
    const pass: any = data.get("password");

    authenticate(emailUser, pass).then(
      (data: CognitoUserSession) => {
        console.log(data)
        navigate("/options");
        window.location.reload();
      }).catch((err: any) => {
        console.log(JSON.stringify(err));
        setAlertList([...alertList, JSON.stringify(err)])
      });
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
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <RouterLink to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </RouterLink>
          <RouterLink to="/signup" className="text-sm text-primary hover:underline">
            Don't have an account? Sign Up
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  );
}