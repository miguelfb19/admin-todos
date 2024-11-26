import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col justify-center items-center w-full">
          <h3 className="text-xl font-bold text-gray-700 text-center overflow-scroll">
            {session.user?.name ?? "No hay usuario"}
            <br />
            <span className="text-sm text-gray-500">
              {session.user?.email ?? "ejemple@ejemplo.com"}
            </span>
          </h3>
        </div>
      </WidgetItem>
    </div>
  );
}
