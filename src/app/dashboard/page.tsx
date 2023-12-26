"use server ";
import React from "react";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function page() {
  return (
    <>
      <div className="flex h-screen bg- flex-col justify-center items-center bg-gray-900">
        <LoginLink className="text-yellow-50 border-2 border-spacing-2 dark:border-white px-4 py-2 rounded-md">
          Sign in
        </LoginLink>

        <RegisterLink className="mt-4  text-yellow-50 border-2 border-spacing-2 dark:border-white px-4 py-2 rounded-md">
          Sign up
        </RegisterLink>
      </div>
    </>
  );
}
