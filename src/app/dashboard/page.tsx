import { WidgetItem } from "@/components";


export const metadata = {
 title: 'Dashboard',
 description: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem />
      </div>
    </div>
  );
}
