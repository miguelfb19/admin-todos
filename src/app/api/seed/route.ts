import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany(); //delete * from todos

  await prisma.todo.createMany({
    data: [
      { description: "lavar loza"},
      { description: "hacer lavar el carro"},
      { description: "Hacer el crm de cmm"},
      { description: "almorzar", complete: true },
      { description: "sacar el perro"},
    ],
  });

  //   const todo = prisma.todo
  //     .create({
  //       data: {
  //         description: "Hacer lel crm de cmm",
  //       },
  //     })
  //     .then((todo) => todo);

  return NextResponse.json({
    message: "Seed executed",
  });
}
