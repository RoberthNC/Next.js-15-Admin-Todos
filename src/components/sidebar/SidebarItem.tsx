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
  const url = usePathname();
  const currentPathname = url.split("/dashboard")[-1];
  const isActive =
    path === currentPathname
      ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
      : "";

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${isActive}`}
      >
        {icon}
        <span className="group-hover:text-gray-700">{label}</span>
      </Link>
    </li>
  );
};
