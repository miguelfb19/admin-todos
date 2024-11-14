import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional().default(false),
});

const getTodo = async (id: string) => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });
  if (!todo)
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  else return NextResponse.json(todo);
}

export async function GET(request: Request) {
  const id = request.url.split('/').at(-1)!
  const todo = await getTodo(id);
  return todo;
}

export async function PUT(request: Request) {
  try {
    const id = request.url.split('/').at(-1)!
    await getTodo(id);
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = request.url.split('/').at(-1)!
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(`TODO eliminado con id: ${id}`);
  } catch (error) {
    return NextResponse.json(error, {status: 400 });
  }
}
