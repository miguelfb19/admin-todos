"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean,
  idUser: string
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id, userId: idUser } });

  if (!todo) {
    throw new Error(`Todo con id ${id} no encontrado`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (
  description: string,
  pathToRevalidate: string,
  idUser: string
) => {
  try {
    // const user = await getUserSessionServer()
    // Acutalmente (v14.2) esta manera de obterner el user no funciona, por el momento se hara por medio de restful-API
    const todo = await prisma.todo.create({
      data: { description, userId: idUser },
    });
    revalidatePath(`/dashboard/${pathToRevalidate}`);
    return todo;
  } catch {
    return { message: "Error al crear el todo" };
  }
};

export const deletedCompleted = async (
  pathTorevalidate: string,
  idUser: string
) => {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { complete: true, userId: idUser },
    });
    revalidatePath(`/dashboard/${pathTorevalidate}`);
    if (deletedTodos.count == 0) {
      return;
    }
    return deletedTodos;
  } catch (error) {
    return { message: "No se pudieron eliminar los Todos", error };
  }
};
