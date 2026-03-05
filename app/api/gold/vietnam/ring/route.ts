import { NextResponse } from "next/server";

export async function GET() {
  try {

    const res = await fetch(
      "https://giavang.now/api/prices?type=SJ9999",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("API failed");
    }

    const data = await res.json();

    return NextResponse.json({
      name: data.name,
      buy: data.buy,
      sell: data.sell,
      time: data.time,
      date: data.date
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Cannot fetch Ring gold price" },
      { status: 500 }
    );

  }
}