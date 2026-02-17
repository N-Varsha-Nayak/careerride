"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type UserPlan = "free" | "premium";

type KodNestUser = {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
};

type UserContextValue = {
  user: KodNestUser;
  setPlan: (plan: UserPlan) => void;
  setName: (name: string) => void;
};

const STORAGE_KEY = "kodnest_user_v1";

const defaultUser: KodNestUser = {
  id: "user_001",
  name: "Varsha",
  email: "varsha@kodnest.app",
  plan: "premium",
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<KodNestUser>(defaultUser);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as KodNestUser;
      if (parsed?.id && parsed?.email) {
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      setPlan: (plan: UserPlan) => setUser((prev) => ({ ...prev, plan })),
      setName: (name: string) => setUser((prev) => ({ ...prev, name })),
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}
