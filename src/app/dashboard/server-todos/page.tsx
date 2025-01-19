export const dynamic = "auto";
export const revalidate = 0;

import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata: Metadata = {
  title: "Listado de Todos - Server Actions",
  description: "Lógica de TODOS usando Server Actions",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({
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
