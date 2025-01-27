import { getUserSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = await params;
  const user = await getUserSession();
  if (!user)
    return NextResponse.json({ message: "No Autorizado" }, { status: 401 });
  const todo = await prisma.todo.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!todo)
    return NextResponse.json(
      { message: `El TODO con el id #${id} no existe` },
      { status: 404 }
    );
  return NextResponse.json({ todo });
}
