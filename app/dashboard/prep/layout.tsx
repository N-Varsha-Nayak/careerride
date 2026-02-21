import { PrepSectionNav } from "@/app/components/dashboard/PrepSectionNav";

export default function PrepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PrepSectionNav />
      <div className="rounded-xl border border-gray-200 bg-white">{children}</div>
    </div>
  );
}

