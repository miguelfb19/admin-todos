import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Dashboard',
 description: 'Dashboard',
};

export default async function DashboardPage() {

  const sesion = await getServerSession(authOptions)

  if (!sesion){
    redirect('/api/auth/signin')
  }


  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem title="Usuario conectado S-Side">
          <div className="flex flex-col justify-center items-center w-full">
            <h3 className="text-xl font-bold text-gray-700 text-center overflow-scroll">
              {sesion.user?.name}
              <br />
              <span className="text-sm text-gray-500">{sesion.user?.email}</span>
            </h3>
          </div>
        </WidgetItem>
      </div>
    </div>
  );
}
