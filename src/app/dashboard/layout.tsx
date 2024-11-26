// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12

import { Sidebar, TopMenu } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] max-h-screen">
        <TopMenu />
        <div id="principal-pagination-content" className="mt-20 p-5">
          {children}
        </div>
      </div>
    </>
  );
}
