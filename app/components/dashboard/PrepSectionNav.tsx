"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const prepLinks = [
  { href: "/dashboard/prep", label: "Dashboard" },
  { href: "/dashboard/prep/practice", label: "Practice" },
  { href: "/dashboard/prep/assessments", label: "Assessments" },
  { href: "/dashboard/prep/resources", label: "Resources" },
  { href: "/dashboard/prep/profile", label: "Profile" },
  { href: "/dashboard/prep/test", label: "Test Checklist" },
  { href: "/dashboard/prep/proof", label: "Build Proof" },
  { href: "/dashboard/prep/ship", label: "Ship" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrepSectionNav() {
  const pathname = usePathname();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-2 mb-4">
      <div className="flex gap-2 overflow-x-auto">
        {prepLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
              isActive(pathname, link.href)
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

