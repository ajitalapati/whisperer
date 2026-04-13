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
    <div className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl dark:bg-primary/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      {alertList.map((message: string, i) => (
        <CustomAlert key={i} message={message} />
      ))}
      <Card className="relative w-full max-w-[420px] rounded-sm border-border/80 bg-card/95 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-2">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-primary/35 bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center font-display text-3xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to continue your conversations.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-11 rounded-sm border-border/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="h-11 rounded-sm border-border/80"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Remember me</Label>
            </div>
            <Button type="submit" className="h-11 w-full rounded-sm font-display tracking-wide">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t border-border/60 bg-muted/20 px-6 py-4 sm:flex-row sm:justify-between sm:gap-2">
          <RouterLink to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </RouterLink>
          <RouterLink to="/signup" className="text-sm text-primary hover:underline">
            Create an account
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  );
}
