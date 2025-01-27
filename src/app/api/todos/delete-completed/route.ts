import { NextResponse } from "next/server";
import { getUserSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";

export async function DELETE() {
  try {
    const user = await getUserSession();

    if (!user)
      return NextResponse.json({ message: "No Autorizado" }, { status: 401 });

    await prisma.todo.deleteMany({
      where: {
        complete: true,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        message: "Los TODOS Completados han sido Eliminados",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
