"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = {
  open: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const SidebarFormContext = createContext<Ctx | null>(null);

export function SidebarFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarFormContext.Provider
      value={{
        open,
        openForm: () => setOpen(true),
        closeForm: () => setOpen(false),
      }}
    >
      {children}
    </SidebarFormContext.Provider>
  );
}

export function useSidebarForm() {
  const ctx = useContext(SidebarFormContext);
  if (!ctx) throw new Error("useSidebarForm must be used within SidebarFormProvider");
  return ctx;
}
