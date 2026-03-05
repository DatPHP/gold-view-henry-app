import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU");

    const data = await res.json();

    return NextResponse.json({
      price: data.price,
      currency: data.currency,
      updated: data.updatedAt
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Cannot fetch gold price" },
      { status: 500 }
    );
  }
}