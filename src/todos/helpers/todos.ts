import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = {
    complete: complete,
  };
  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-type": "aplication/json" },
  }).then((res) => res.json());

  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = {
    description: description,
  };
  const todo = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "aplication/json" },
  }).then((res) => res.json());

  return todo;
};

export const deletedTodo = async () => {
  const deletedTodos = await fetch(`/api/todos`, {
    method: "DELETE",
    headers: { "Content-type": "aplication/json" },
  }).then((res) => res.json());

  return deletedTodos
};
