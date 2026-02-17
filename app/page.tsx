import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-3">KodNest Suite</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">One dashboard for resume, prep, and job tracking.</h1>
        <p className="text-slate-600 mb-8">Unified SaaS shell with persistent user profile and premium navigation.</p>
        <Link className="inline-flex px-6 py-3 rounded-lg bg-slate-900 text-white font-medium" href="/dashboard/resume">
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
