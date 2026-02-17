"use client";

import { useParams } from "next/navigation";
import Dashboard from "@/modules/placementredy/pages/Dashboard";
import Practice from "@/modules/placementredy/pages/Practice";
import Assessments from "@/modules/placementredy/pages/Assessments";
import Resources from "@/modules/placementredy/pages/Resources";
import Profile from "@/modules/placementredy/pages/Profile";
import TestChecklist from "@/modules/placementredy/pages/TestChecklist";
import ProofPage from "@/modules/placementredy/pages/ProofPage";
import ShipPage from "@/modules/placementredy/pages/ShipPage";

const routes: Record<string, React.ComponentType> = {
  "": Dashboard,
  practice: Practice,
  assessments: Assessments,
  resources: Resources,
  profile: Profile,
  test: TestChecklist,
  proof: ProofPage,
  ship: ShipPage,
};

export default function PrepRoutePage() {
  const params = useParams<{ slug?: string[] }>();
  const section = params.slug?.[0] ?? "";
  const PageComponent = routes[section] ?? Dashboard;

  return (
    <div className="min-h-[calc(100vh-7rem)] rounded-xl border border-gray-200 bg-white">
      <PageComponent />
    </div>
  );
}