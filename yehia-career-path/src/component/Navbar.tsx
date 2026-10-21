"use client";
import Link from "next/link";
import Image from "next/image";
import profileImage from "../../public/profile_image.png";
import { usePathname } from "next/navigation";
// import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-slate-900 text-slate-500 border-b border-slate-800 w-full  py-3">
      <div className="flex items-center justify-between mx-auto max-w-325">
        <nav className="flex items-center space-x-5 px-5 ">
          <Link
            href="/"
            className={`hover:text-amber-400 transition-colors duration-300 ${pathname === "/" ? "text-amber-400" : ""} `}
          >
            Home
          </Link>

          <div>
            <Link
              href="/plan"
              className={`hover:text-amber-400 transition-colors duration-300 ${pathname === "/plan" ? "text-amber-400" : ""} `}
            >
              Plan
            </Link>
            {/* <div className="border-b-2 border-amber-500"></div> */}
          </div>
          <Link
            href="/opportunities"
            className={`hover:text-amber-400 transition-colors duration-300 ${pathname === "/opportunities" ? "text-amber-400" : ""} `}
          >
            Opportunities
          </Link>
          <Link
            href="/dashboard"
            className={`hover:text-amber-400 transition-colors duration-300 ${pathname === "/dashboard" ? "text-amber-400" : ""} `}
          >
            Dashboard
          </Link>
        </nav>
        <div className="px-5 object-fill  ">
          <Image
            src={profileImage}
            alt="profile image"
            width={40}
            className="rounded-full cursor-pointer border-2 border-slate-200/50"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
