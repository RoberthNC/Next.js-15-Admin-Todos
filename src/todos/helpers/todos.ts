import { Todo } from "@prisma/client";

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // await sleep(3);
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

export const deleteCompletedTodos = async (): Promise<boolean> => {
  await fetch("/api/todos/delete-completed", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
  return true;
};
