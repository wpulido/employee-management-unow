'use client';
import {useEffect, ReactNode} from "react";
import {useRouter} from 'next/navigation';
import {useAuth} from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push('/login');
        }
    }, [user, router]);

    return user ? <>{children}</> : null;
}

