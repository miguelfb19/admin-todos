import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Args {
  params: { id: string };
}

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

export async function GET({ params }: Args) {
  const todo = await getTodo(params.id);
  return todo;
}

export async function PUT(request: Request, { params }: Args) {
  try {
    await getTodo(params.id);
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: Args) {
  try {
    await prisma.todo.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(`TODO eliminado con id: ${params.id}`);
  } catch (error) {
    return NextResponse.json(error, {status: 400 });
  }
}
