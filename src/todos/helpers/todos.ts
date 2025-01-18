import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };
  const todo = await fetch(`/api/todos/update-one/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };
  const todo = await fetch("/api/todos/create-one", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
  return todo;
};
