import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = +(searchParams.get("limit") ?? "10");
  const offset = +(searchParams.get("offset") ?? "0");
  if (isNaN(limit))
    return NextResponse.json(
      { message: "Limit tiene que ser un número" },
      { status: 400 }
    );
  if (isNaN(offset))
    return NextResponse.json(
      { message: "Offset tiene que ser un número" },
      { status: 400 }
    );
  const todos = await prisma.todo.findMany({
    take: limit,
    skip: offset,
  });
  return NextResponse.json({
    todos,
  });
}
