"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BriefcaseBusiness, CircleUserRound, CreditCard, FileText, GraduationCap } from "lucide-react";
import { useUser } from "@/app/contexts/UserContext";

const products = [
  { key: "resume", label: "AI Resume", path: "/dashboard/resume" },
  { key: "prep", label: "Placement Ready", path: "/dashboard/prep" },
  { key: "jobs", label: "Job Notify", path: "/dashboard/jobs" },
] as const;

const sidebarItems = [
  { href: "/dashboard/resume", label: "Resume", icon: FileText },
  { href: "/dashboard/prep", label: "Prep", icon: GraduationCap },
  { href: "/dashboard/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

function active(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const currentProduct = products.find((item) => active(item.path, pathname))?.path ?? "/dashboard/resume";

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-950 text-slate-200 border-r border-slate-800 hidden md:flex md:flex-col">
        <div className="px-5 py-5 border-b border-slate-800">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">KodNest Suite</p>
          <p className="text-lg font-semibold mt-1">Premium Workspace</p>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = active(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-500/20 text-sky-200" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <select
              aria-label="Product Switcher"
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
              value={currentProduct}
              onChange={(event) => router.push(event.target.value)}
            >
              {products.map((product) => (
                <option key={product.path} value={product.path}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="px-2 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 uppercase text-xs font-semibold">
              {user.plan}
            </span>
            <div className="flex items-center gap-2">
              <CircleUserRound className="w-5 h-5 text-slate-500" />
              <div className="leading-tight">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-slate-500 text-xs">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
