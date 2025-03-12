'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface User {
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    register: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedUser = jwt.decode(token) as User;
                    if (decodedUser) {
                        setUser(decodedUser);
                    } else {
                        console.warn("Token inválido, eliminando...");
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error("Error al decodificar el token:", error);
                    localStorage.removeItem('token');
                }
            }
        }
    }, []);

    const register = (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        const decodedUser = jwt.decode(token) as User;
        setUser(decodedUser);
        router.push('/dashboard');
    };

    const login = (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }

        const decodedUser = jwt.decode(token) as User;

        setUser(decodedUser);
        router.push('/dashboard');
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
