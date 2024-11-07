import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos/components";

export const metadata = {
 title: 'Crear nuevo TODO',
 description: 'Crear nuevo TODO',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({orderBy: { description: "asc" }})

  return (
    <div>
      {/* TODO: formulario para agregar nuevos todos */}
      <TodosGrid todos={todos}/>
    </div>
  );
}
