'use client';
import { useState, FormEvent } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Button, TextInput, Alert, Label, Card } from 'flowbite-react';
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    login(data.token);
                } else {
                    console.error("El token no está en la respuesta del backend");
                    setError("Error: No se recibió un token válido");
                }
            } else {
                console.error("Error en el login:", data.message);
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            setError('Error en la conexión con el servidor');
        }
    };

    return (
        <div className="login flex justify-center items-center w-full h-screen">
            <Card className="max-w-sm w-full">
                <h1 className="text-black font-semibold text-3xl text-center">Sign in</h1>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email" value="Email" />
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
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button color="blue" type="submit">Sign in</Button>
                    <Link href="/register" className="w-full">
                    <Button className="w-full" color="blue" type="submit">Register</Button>
                    </Link>
                    

                    {error && <Alert color="failure">{error}</Alert>}
                </form>
            </Card>
        </div>
    );
}
