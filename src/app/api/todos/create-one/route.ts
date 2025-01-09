import { NextResponse } from "next/server";
import * as yup from "yup";
import prisma from "@/lib/prisma";

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({ data: { complete, description } });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
