import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
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
