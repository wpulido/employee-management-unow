import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5001/api";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.headers.get("Authorization");
        const body = await req.json();
        const { id } = params;

        const response = await fetch(`${BACKEND_URL}/employees/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token!,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Failed to update employee" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error updating employee:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.headers.get("Authorization");
        const { id } = params;

        const response = await fetch(`${BACKEND_URL}/employees/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token!,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Failed to delete employee" }, { status: response.status });
        }

        return NextResponse.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
