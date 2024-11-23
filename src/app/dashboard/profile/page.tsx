"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-4xl font-bold my-10">Perfil de usuario</h1>
      <div className="flex flex-col justify-center items-center gap-y-3">
        <Image
          width={100}
          height={100}
          src={session?.user?.image! ?? ""}
          alt={session?.user?.name ?? "profile picture"}
          className="rounded-full shadow-xl shadow-blue-500"
        />
        <span>
          <b>Nombre de usuario: </b>
          {session?.user?.name ?? "No name"}
        </span>
        <span>
          <b>Email: </b>
          {session?.user?.email ?? "No name"}
        </span>
      </div>
    </div>
  );
}
