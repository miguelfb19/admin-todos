import { WidgetItem } from "@/components";


export const metadata = {
 title: 'Dashboard',
 description: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem title="Dashboard">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold text-gray-700">
              Hola
            </h3>
          </div>
        </WidgetItem>
      </div>
    </div>
  );
}
