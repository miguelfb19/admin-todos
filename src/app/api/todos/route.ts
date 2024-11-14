import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") ?? "10");
  const skip = +(searchParams.get("skip") ?? "0");
  // el + hace la conversion del tipo de dato de string a number, tambien se puede hacer con el metodo Number()

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "take debe ser un numero" },
      { status: 400 }
    );
  }
  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "skip debe ser un numero" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    // Con la desestructuracion me aseguro que la peticion POST solo reciba los parametros del body que voy a permitir en el cuerpo.
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({ data: { complete, description } });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });

    if (deletedTodos.count == 0) {
      return NextResponse.json({
        message: "No hay TODOS completados para eliminar",
        status: 400,
      });
    } else {
      return NextResponse.json({
        message: `Se eliminaron ${deletedTodos.count} TODOS completados`,
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error,
      message: "No se pudieron eliminar los TODOS",
      status: 400,
    });
  }

  return;
}
