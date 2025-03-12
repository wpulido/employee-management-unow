import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://ibillboard.com/api/positions");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch positions", error: (error as Error).message }, { status: 500 });
  }
}
