"use client";

// import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
// import * as todosApi from "@/todos/helpers/todos";
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "@/todos/actions/todo-actions";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // const router = useRouter();

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, complete);
  //   router.refresh();
  //   return updatedTodo;
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
