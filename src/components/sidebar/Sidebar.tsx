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
import { Logout } from "./Logout";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard/home",
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

  const userName = session?.user?.name ?? "No name";
  const userEmail = session?.user?.email ?? "No email";
  const userRoles = session?.user?.roles!;

  const role =
    userRoles?.find((role) => role == "admin") ||
    userRoles?.find((role) => role == "client") ||
    "No role";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div className="overflow-scroll">
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
          {!session?.user?.image ? (
            <Image
              width={100}
              height={100}
              src="/images/no-session.png"
              alt="profile image no session"
              className="w-6 h-6 m-auto rounded-full object-cover lg:w-20 lg:h-20"
            />
          ) : (
            <Image
              width={500}
              height={500}
              src={session.user?.image!}
              alt="profile image"
              className="w-6 h-6 m-auto rounded-full object-cover lg:w-20 lg:h-20"
            />
          )}
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="text-sm text-gray-500">{userEmail}</span>
          <span className="hidden text-gray-400 lg:block capitalize">{role}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8 ">
          {menuItems.map(({ name, path, icon }) => (
            <SidebarItem key={name} title={name} path={path} icon={icon} />
          ))}
        </ul>
      </div>

      <Logout />
    </aside>
  );
};
