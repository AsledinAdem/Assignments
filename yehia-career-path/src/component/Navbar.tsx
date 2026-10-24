"use client";
import Link from "next/link";
import Image from "next/image";
import profileImage from "../../public/profile_image.png";
import { usePathname } from "next/navigation";
import { BiMenu, BiX } from "react-icons/bi";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="relative bg-slate-900 text-slate-500 border-b border-slate-800 w-full  py-3">
      <div className="flex items-center justify-between px-3">
        <nav className="hidden sm:flex items-center space-x-5 px-5 ">
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
        <BiMenu
          size={30}
          className="cursor-pointer text-amber-500 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="px-5 object-fill  ">
          <Image
            src={profileImage}
            alt="profile image"
            width={40}
            className="rounded-full cursor-pointer border-2 border-slate-200/50"
          />
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`absolute top-2 min-h-screen w-64 flex  justify-center   md:hidden bg-slate-700 rounded-r-lg transition-transform duration-300 ${isMenuOpen ? "-translate-x-64" : "translate-x-0"} transition-transform duration-300`}
      >
        <nav className="flex flex-col items-center  space-y-5  mt-10">
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
        <BiX
          size={30}
          className="cursor-pointer text-amber-500 absolute top-2 right-2"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
