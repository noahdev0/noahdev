"use client";
import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Props = {
  onClick: () => void;
};

const NavBar = (props: Props) => {
  const router = useRouter();

  const handleDownloadResume = () => {
    router.push("/Resume.pdf");
  };
  return (
    <nav className="py-10 px-11 md:px-20 mb-12 flex justify-between dark:text-white">
      <div className="text-center text-3xl font-bold py-8"></div>

      <ul className="flex items-center justify-between w-full ">
        <li>
          <BsFillMoonStarsFill
            onClick={props.onClick}
            className=" cursor-pointer text-2xl"
          />
        </li>
        <li>
          <button
            onClick={handleDownloadResume}
            className={cn(buttonVariants())}
          >
            Resume <DownloadIcon className="ml-2 animate-bounce" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
