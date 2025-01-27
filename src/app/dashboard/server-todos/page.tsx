export const dynamic = "auto";
export const revalidate = 0;

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserSession } from "@/auth/actions/auth-actions";
import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Listado de Todos - Server Actions",
  description: "Lógica de TODOS usando Server Actions",
};

export default async function ServerTodosPage() {
  const user = await getUserSession();

  if (!user) redirect("api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      description: "asc",
    },
  });

  return (
    <>
      <div className="text-3xl mb-5">Server Actions</div>
      <div className="w-full px-3 mx-5 pb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
