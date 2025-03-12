import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5001/api";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");
    const response = await fetch(`${BACKEND_URL}/employees`, {
      method: "GET",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    if (!response.ok) {
      return NextResponse.json({ message: "Failed to fetch employees" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = req.headers.get("Authorization");

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const response = await fetch(`${BACKEND_URL}/employees/create`, {
      method: "POST",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Pasar el token al backend
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to add employee" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("Authorization");
    const body = await req.json();
    const { id, ...updateData } = body;

    const response = await fetch(`${BACKEND_URL}/employees/${id}`, {
      method: "PUT",
      // @ts-ignore
      headers: { Authorization: token },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to update employee" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const response = await fetch(`${BACKEND_URL}/employees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to delete employee" }, { status: response.status });
    }

    return NextResponse.json({ message: "Employee deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
