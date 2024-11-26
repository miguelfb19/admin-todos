import { AuthProvider } from "@/auth";
import { WidgetItem } from "@/components";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function DashboardPage() {

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Bienvenido a admin-todos">
        <div className="flex flex-col justify-center items-center w-full">
          <h3 className="text-xl font-bold text-gray-700 text-center overflow-scroll">
            {/* {session.user?.name ?? "No hay usuario"} */}
            <br />
            <span className="text-sm text-gray-500">
              {/* {session.user?.email ?? "ejemple@ejemplo.com"} */}
            </span>
          </h3>
        </div>
      </WidgetItem>
    </div>
  );
}
