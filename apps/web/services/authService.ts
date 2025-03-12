const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/auth';

export const register = async (user: Record<string, any>) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    if (!res.ok) throw new Error('Error registering user');
    return res.json();
};

export const login = async (user: Record<string, any>) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    if (!res.ok) throw new Error('Error logging in');
    return res.json();
};
