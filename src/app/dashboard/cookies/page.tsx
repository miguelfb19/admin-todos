
// Aqui se usa cookies de next/headers porque estamos del lado del servidor
import { cookies } from "next/headers";
import { TabBar } from "../../../components/tabBar/TabBar";
export const metadata = {
  title: "Cookies page",
  description: "Cookies page",
};

const tabOptions = [1, 2, 3, 4, 5];

export default async function CookiesPage() {

  const cookieStore = await cookies();
  const cookieNumber = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar tabOptions={tabOptions} currentTab={+cookieNumber} />
      </div>
    </div>
  );
}
