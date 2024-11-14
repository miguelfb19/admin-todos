"use client";

import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;
  updateTodo: (id: string, complete: boolean) => Promise<Todo>;
}

export const TodoItem = ({ todo, updateTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      await updateTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  return (
    <>
      <div
        className={
          todoOptimistic.complete ? styles.todoDone : styles.todoPending
        }
      >
        <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
          <button
            // onClick={() =>
            //   updateTodo(todoOptimistic.id, !todoOptimistic.complete)
            // }
            onClick={onToggleTodo}
            className={`flex p-1 rounded-md cursor-pointer hover:bg-opacity-60 ${
              todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"
            }`}
          >
            {todoOptimistic.complete ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </button>
          <div>{todoOptimistic.description}</div>
        </div>
      </div>
    </>
  );
};
