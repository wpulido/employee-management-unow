'use client';
import {useState, FormEvent} from "react";
import {useRouter} from 'next/navigation';
import {useAuth} from "../../../context/AuthContext";
import { Button, TextInput, Alert, Label, Checkbox, Card } from 'flowbite-react';
import axios from "axios";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register} = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('api/register', {email, password});
            router.push('/login');
        } catch (err) {
            console.error('register failed', err);
        }
    }
    return (
        <div className="login flex justify-center items-center w-full h-screen">
            <Card className="max-w-sm w-full">
                <h1 className="text-black font-semibold text-3xl text-center">Sign up</h1>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button color={"blue"} type="submit">Sign up</Button>

                    {error && (
                        <Alert color="failure" className="mt-4">
                            {error}
                        </Alert>
                    )}
                </form>
            </Card>
        </div>
    )
}
