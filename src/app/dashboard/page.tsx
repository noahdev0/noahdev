"use client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status, update } = useSession();

  if (status === "authenticated") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Signed in as {session.user?.name}</p>

        {/* Update the value by sending it to the backend. */}
        <button onClick={() => update({ name: "John Doe" })}>Edit name</button>
        {/*
         * Only trigger a session update, assuming you already updated the value server-side.
         * All `useSession().data` references will be updated.
         */}
        <button className="p-7 bg-blue-500" onClick={() => update()}>
          Edit name
        </button>
      </div>
    );
  }

  return (
    <a className="p-7 bg-blue-500" href="/api/auth/signin">
      Sign in
    </a>
  );
}
