import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { BiCookie, BiShoppingBag } from "react-icons/bi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { CiLogout } from "react-icons/ci";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    name: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    name: "Server TODOS",
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
  },
  {
    name: "Cookies",
    path: "/dashboard/cookies",
    icon: <BiCookie size={30} />,
  },
  {
    name: "Shop",
    path: "/dashboard/shop",
    icon: <BiShoppingBag size={30} />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={25} />,
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/" title="home" className="flex gap-3 items-center">
            <Image
              width={100}
              height={100}
              src="/images/logo.jpeg"
              className="w-10"
              alt="no session logo"
            />
            <p className="text-xl">
              Curso de Next<b>JS</b>
            </p>
          </Link>
        </div>

        <div className="mt-8 text-center">
          {!session ? (
            <Image
              width={200}
              height={200}
              src="/images/foto.jpeg"
              alt="profile image no session"
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
          ) : (
            <Image
              width={100}
              height={100}
              src={session.user?.image!}
              alt="profile image"
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
          )}
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session.user?.name ?? "No name"}
          </h5>
          <span className="text-sm text-gray-500">{session.user?.email ?? 'no email'}</span>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map(({ name, path, icon }) => (
            <SidebarItem key={name} title={name} path={path} icon={icon} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
