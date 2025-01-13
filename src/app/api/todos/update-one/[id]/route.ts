import { NextResponse } from "next/server";
import * as yup from "yup";
import prisma from "@/lib/prisma";

interface Segments {
  params: {
    id: string;
  };
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = await params;
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo)
    return NextResponse.json(
      { message: `El TODO con el id #${id} no existe` },
      { status: 404 }
    );
  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        complete,
        description,
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
