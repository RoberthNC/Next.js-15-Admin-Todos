import { NextResponse } from "next/server";
import * as yup from "yup";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/auth/actions/auth-actions";

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const user = await getUserSession();

    if (!user)
      return NextResponse.json({ message: "No Autorizado" }, { status: 401 });
    const { complete, description } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
