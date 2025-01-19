"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });
  if (!todo) throw `Todo con id #${id} no encontrado`;
  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      complete,
    },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string): Promise<Todo> => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
      },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    throw error;
  }
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    revalidatePath("/dashboard/server-todos");
    return true;
  } catch (error) {
    throw error;
  }
};
