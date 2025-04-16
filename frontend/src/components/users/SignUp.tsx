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
        <div className="flex min-h-screen items-center justify-center">
            {alertList.map((message, index) => (
                <CustomAlert key={index} message={message} />
            ))}
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
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <a href="/signin" className="text-primary hover:underline">
                            Sign in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}