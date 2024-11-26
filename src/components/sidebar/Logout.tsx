"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { PiSignInDuotone } from "react-icons/pi";
import { LoadingSpinner } from '../widgets/LoadingSpinner';

export const Logout = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <span className="px-4 py-0 flex items-center space-x-4 rounded-md text-gray-600 group">
          <LoadingSpinner/>
        </span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button
          onClick={() => signIn()}
          className="px-4 py-0 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
          <PiSignInDuotone />
          <span className="group-hover:text-gray-700">SigIn</span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <button
        onClick={() => signOut()}
        className="px-4 py-0 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <CiLogout />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
    </div>
  );
};
