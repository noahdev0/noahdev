import React from "react";
import { CiSettings } from "react-icons/ci";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="mx-auto text-center h-screen flex  flex-col justify-around text-white bg-black">
      <h1 className="mx-auto font-semibold text-5xl">404 - Page Not Found</h1>
      <p className="text-4xl">
        This page is being worked on, please try again later.
        <CiSettings className="inline-block animate-spin" />
      </p>
      <h3>Try again buddy</h3>
    </div>
  );
}
