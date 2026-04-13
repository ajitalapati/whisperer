import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cognitoService from '../../services/cognitoService';
import CustomAlert from './CustomAlert';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const [alertList, setAlertList] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: FormData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };

        const userAttributes: CognitoUserAttribute[] = [
            new CognitoUserAttribute({
                Name: "email",
                Value: data.email
            }),
            new CognitoUserAttribute({
                Name: "name",
                Value: data.name
            })
        ];

        cognitoService.signUp(data.email, data.password, userAttributes, [], (err) => {
            if (err) {
                setAlertList(prev => [...prev, err.message || JSON.stringify(err)]);
            } else {
                navigate("/signin");
                window.location.reload();
            }
        });
    };

    return (
        <div className="relative flex min-h-[calc(100vh-4.25rem)] items-center justify-center overflow-hidden px-4 py-12">
            <div
                className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-primary/12 blur-3xl dark:bg-primary/18"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
                aria-hidden
            />

            {alertList.map((message, index) => (
                <CustomAlert key={index} message={message} />
            ))}
            <Card className="relative w-full max-w-[420px] rounded-sm border-border/80 bg-card/95 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-4 pb-2">
                    <div className="flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-primary/35 bg-primary/10">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-center font-display text-3xl font-semibold tracking-tight">
                        Join Whisperer
                    </CardTitle>
                    <p className="text-center text-sm text-muted-foreground">
                        Create an account to save your dialogues.
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-foreground">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                autoFocus
                                className="h-11 rounded-sm border-border/80"
                            />
                        </div>
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
                            Sign up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-border/60 bg-muted/20 px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <RouterLink to="/signin" className="font-medium text-primary hover:underline">
                            Sign in
                        </RouterLink>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
