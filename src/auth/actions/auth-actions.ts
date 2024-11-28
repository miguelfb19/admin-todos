
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const createUser = async (email: string, password: string) => {
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
      roles: ["client"],
    },
  });

  return newUser;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password || email === "" || password === "") return null;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

export const getUserSessionServer = async () => {
    const session = await getServerSession(authOptions)
    return session?.user
};
