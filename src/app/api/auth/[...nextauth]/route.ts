import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "ejemplo@ejemplo.com",
        },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        const user = signInEmailPassword(
          credentials?.email ?? "",
          credentials?.password ?? ""
        );

        if (!user) {
          throw new Error("No user found");
        }

        return user;
      },
    }),
    // ...add more providers here
  ],

  // Le digo que la sesión va a usar JWT como estrategia de autenticación
  session: {
    strategy: "jwt",
  },

  // Las callback son funciones que se van a ejecutar durante la autenticación antes de responder al usuario
  callbacks: {
    // Si hago return false, va a cancelar la autenticacion en el usuario
    async signIn({ user, account, email, profile, credentials }) {
      return true;
    },

    // En el JWT hago modificaciones para incluir las propiedades que necesito como roles y id
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "" },
      });

      // Si el usuario esta marcado como no-activo entonces no lo deja ingresar
      if (dbUser?.isActive == false) {
        throw Error("User is not active");
      }

      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },

    // Modifico los mismos campos en la session para poder mostrarla en la interfaz de usuario
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
