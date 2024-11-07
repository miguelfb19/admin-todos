import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  return (
    <>
      <div className={todo.complete ? styles.todoDone : styles.todoPending}>
        <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
          <button className={`flex p-1 rounded-md cursor-pointer hover:bg-opacity-60 ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}`}>
            {todo.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30}/>}
          </button>
          <div>{todo.description}</div>
        </div>
      </div>
    </>
  );
};
