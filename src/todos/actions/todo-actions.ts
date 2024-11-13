"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

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
  pathToRevalidate: string
) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath(`/dashboard/${pathToRevalidate}`);
    return todo;
  } catch (error) {
    return { message: "Error al crear el todo" };
  }
};

export const deletedCompleted = async (pathTorevalidate: string) => {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { complete: true },
    });
    revalidatePath(`/dashboard/${pathTorevalidate}`);
    if(deletedTodos.count == 0){
      return
    }
    return deletedTodos;
  } catch (error) {
    return { message: "No se pudieron eliminar los Todos", error };
  }
};
