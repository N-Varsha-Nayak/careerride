"use client";

import { useUser } from "@/app/contexts/UserContext";

export default function BillingPage() {
  const { user, setPlan } = useUser();

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Billing</h1>
      <p className="text-sm text-slate-600 mb-6">Placeholder billing workspace for KodNest Suite.</p>

      <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 mb-6">
        <p className="text-sm">Current plan: <span className="font-semibold uppercase">{user.plan}</span></p>
        <p className="text-xs text-slate-500 mt-1">Stored in localStorage (`kodnest_user_v1`).</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setPlan("free")} className="px-4 py-2 rounded-lg border border-slate-300 text-sm">Switch to Free</button>
        <button onClick={() => setPlan("premium")} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">Switch to Premium</button>
      </div>
    </div>
  );
}