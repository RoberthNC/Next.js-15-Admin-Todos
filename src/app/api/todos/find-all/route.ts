import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/auth/actions/auth-actions";
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
  const user = await getUserSession();

  if (!user)
    return NextResponse.json({ message: "No Autorizado" }, { status: 401 });
  const todos = await prisma.todo.findMany({
    take: limit,
    skip: offset,
    where: {
      userId: user.id,
    },
  });
  return NextResponse.json({
    todos,
  });
}
