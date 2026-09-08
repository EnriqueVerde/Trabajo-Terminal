"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Breadcrumbs, pathnameToCrumbs } from "@/components/ui/Breadcrumbs";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";

const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status, fetchSession } = useAuthStore();
  const { sidebarCollapsed } = useUIStore();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "idle" || status === "loading" || status === "unauthenticated") {
    return (
      <div style={{ padding: "var(--space-6)" }}>
        <div className="skeleton" style={{ height: 32, width: 200, marginBottom: "var(--space-4)" }} />
        <div className="skeleton" style={{ height: 120, width: "100%" }} />
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div
        style={{
          marginLeft: sidebarCollapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
          transition: "margin-left var(--transition-normal)",
        }}
      >
        <Topbar />
        <main style={{ padding: "var(--space-6)" }}>
          <div style={{ marginBottom: "var(--space-4)" }}>
            <Breadcrumbs crumbs={pathnameToCrumbs(pathname)} />
          </div>
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
