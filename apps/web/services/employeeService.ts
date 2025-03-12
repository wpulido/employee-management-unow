const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/employees';

const getAuthHeaders = (): HeadersInit => ({
    'x-auth-token': typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
    'Content-Type': 'application/json'
});


export const getEmployees = async () => {
    const res = await fetch(API_URL, { headers: getAuthHeaders(), cache: 'no-store' });
    if (!res.ok) throw new Error('Error fetching employees');
    return res.json();
};

export const createEmployee = async (employee: Record<string, any>) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(employee)
    });
    if (!res.ok) throw new Error('Error creating employee');
    return res.json();
};

export const updateEmployee = async (id: string, employee: Record<string, any>) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(employee)
    });
    if (!res.ok) throw new Error('Error updating employee');
    return res.json();
};

export const deleteEmployee = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error deleting employee');
    return res.json();
};
