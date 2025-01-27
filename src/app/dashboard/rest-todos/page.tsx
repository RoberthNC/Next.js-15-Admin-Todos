export const dynamic = "auto";
export const revalidate = 0;

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata: Metadata = {
  title: "Listado de Todos",
  description: "",
};

export default async function RestTodosPage() {
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
    <div>
      <div className="w-full px-3 mx-5 pb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
