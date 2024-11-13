"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
// import { updateTodo } from "../helpers/todos";

import { toggleTodo } from "../actions/todo-actions";

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {


  // const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  //   const update = await updateTodo(id, complete);
  //   router.refresh(); //esto hace que se refresque solo el componente TodoItem que llama a la función
  //   return update;
  // };

  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={toggleTodo} />
        ))}
      </div>
    </div>
  );
};
