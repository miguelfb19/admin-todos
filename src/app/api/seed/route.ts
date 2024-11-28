import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  await prisma.todo.deleteMany(); //delete * from todos
  await prisma.user.deleteMany(); //delete * from todos

  await prisma.user.create({
    data: {
      email: "test1@gmail.com",
      password: bcrypt.hashSync("user1ID"),
      roles: ["admin", "client"],
      name: "Usuario del Seed",
      todos: {
        create: [
          { description: "Hacer la compra", complete: true },
          { description: "Hacer la venta" },
          { description: "Hacer la limpieza" },
          { description: "sacar el perro" },
        ],
      },
    },
  });

  return NextResponse.json({
    message: "Seed executed",
  });
}
