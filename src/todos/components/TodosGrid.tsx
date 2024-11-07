'use client'

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  return (
    <div className="flex flex-col gap-y-10">
      <h3 className="text-4xl w-full text-center">Todo List</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {todos.map( todo => (
            <TodoItem key={ todo.id } todo={ todo } />
          ))}
      </div>
    </div>
  );
};
