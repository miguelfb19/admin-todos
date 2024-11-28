"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { addTodo, deletedCompleted } from "../actions/todo-actions";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
// import { getUserSessionServer } from "@/auth/actions/auth-actions";


interface Props {
  user: User
}

export const NewTodo = ({ user }: Props) => {
  const [loadingSeed, setLoadingSeed] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const path = usePathname().split("/").at(-1)!;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) return;

    setLoadingCreate(false);
    try {
      const todo = await addTodo(description, path, user.id);
      console.log(`Todo Creado: ${todo}`);
      // router.refresh();
      setLoadingCreate(true);
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAll = async () => {
    try {
      const deletedTodos = await deletedCompleted(path, user.id);
      console.log(deletedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const seed = async () => {
    setLoadingSeed(false);
    await fetch("/api/seed");
    router.refresh();
    setLoadingSeed(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-2/4 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        <div className="w-10 h-auto flex justify-center">
          {loadingCreate ? (
            "Crear"
          ) : (
            <CgSpinner className="animate-spin duration-200" size={25} />
          )}
        </div>
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={seed}
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        <div className="w-10 h-auto flex justify-center">
          {loadingSeed ? (
            "Seed"
          ) : (
            <CgSpinner className="animate-spin duration-200" size={25} />
          )}
        </div>
      </button>

      <button
        onClick={deleteAll}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Borrar completados
      </button>
    </form>
  );
};
