"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  const { data: session, status, update } = useSession();

  if (status === "authenticated") {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Signed in as {session.user?.name}</p>
        <Image
          src={`${session.user?.image}`}
          height={50}
          width={50}
          alt="avatar"
        />

        {/* Update the value by sending it to the backend. */}
        <button onClick={() => update({ name: "John Doe" })}>Edit name</button>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <a className="p-7 bg-blue-500" href="/api/auth/signin">
        Sign in
      </a>
    </div>
  );
}
