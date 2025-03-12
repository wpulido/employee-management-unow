import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const response = await fetch('http://localhost:5001/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
