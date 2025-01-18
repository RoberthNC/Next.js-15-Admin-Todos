"use client";

import { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  label: string;
}

export const SidebarItem = ({ path, icon, label }: Props) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md  group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${
          pathName === path
            ? '"text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : ""
        }`}
      >
        {icon}
        <span className="group-hover:text-white-700">{label}</span>
      </Link>
    </li>
  );
};
