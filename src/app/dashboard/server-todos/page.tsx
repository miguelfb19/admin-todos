export const dynamic = 'force-dynamic'
export const revalidate = 0
//Esto hace que esta pagina sea generada dinamicamente siempre

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";

export const metadata = {
  title: "Crear nuevo TODO",
  description: "Crear nuevo TODO",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <div className="w-full px-3 mb-5">
        <NewTodo />
      </div>
      <h3 className="text-4xl w-full text-center mb-10">Server Todos List</h3>
      <TodosGrid todos={todos} />
    </>
  );
}
