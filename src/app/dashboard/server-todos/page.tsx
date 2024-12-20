export const dynamic = "force-dynamic";
export const revalidate = 0;
import { getUserSessionServer } from "@/auth/actions/auth-actions";
//Esto hace que esta pagina sea generada dinamicamente siempre

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Server TODOS",
  description: "Crear nuevo TODO",
};

export default async function ServerTodosPage() {

  const user = await getUserSessionServer()

  if(!user){
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
    where: { userId: user.id },
  });

  return (
    <>
      <div className="w-full px-3 mb-5">
        <NewTodo user={user}/>
      </div>
      <h3 className="text-4xl w-full text-center mb-10">Server Todos List</h3>
      <TodosGrid todos={todos} user={user}/>
    </>
  );
}