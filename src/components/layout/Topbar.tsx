"use client";

import { useState } from "react";
import { Search, Sun, Moon, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { NotificationBell } from "./NotificationBell";

export function Topbar() {
  const router = useRouter();
  const { user, workspaces, activeWorkspaceId, switchWorkspace, logout } = useAuthStore();
  const { theme, toggleTheme, setCommandPaletteOpen } = useUIStore();
  const [wsOpen, setWsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);
  const initials = (user?.name ?? "U").slice(0, 2).toUpperCase();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <header className="topbar">
      <button className="search-trigger" onClick={() => setCommandPaletteOpen(true)}>
        <Search size={16} />
        <span>Buscar…</span>
        <kbd className="badge">⌘K</kbd>
      </button>

      <div className="topbar-actions">
        <div style={{ position: "relative" }}>
          <button className="btn btn-ghost" onClick={() => setWsOpen((o) => !o)}>
            {activeWorkspace?.name ?? "Workspace"} <ChevronDown size={14} />
          </button>
          {wsOpen && (
            <div className="dropdown-panel" style={{ right: 0, top: "calc(100% + 8px)" }}>
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  className={`dropdown-item ${ws.id === activeWorkspaceId ? "active" : ""}`}
                  onClick={() => {
                    switchWorkspace(ws.id);
                    setWsOpen(false);
                  }}
                >
                  {ws.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <NotificationBell />

        <button className="btn btn-ghost" style={{ padding: "var(--space-2)" }} onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div style={{ position: "relative" }}>
          <button className="avatar-btn" onClick={() => setUserOpen((o) => !o)}>
            {initials}
          </button>
          {userOpen && (
            <div className="dropdown-panel" style={{ right: 0, top: "calc(100% + 8px)", width: 220 }}>
              <div style={{ padding: "var(--space-2) var(--space-3)" }}>
                <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{user?.name}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{user?.email}</div>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={() => router.push("/settings")}>
                <UserCircle size={16} /> Ver perfil
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .topbar {
          position: sticky;
          top: 0;
          height: var(--header-height);
          background: var(--color-bg-primary);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-5);
          z-index: 30;
        }
        .search-trigger {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: var(--color-bg-secondary);
          color: var(--color-text-muted);
          cursor: pointer;
          font-size: var(--text-sm);
          width: 260px;
        }
        .search-trigger span {
          flex: 1;
          text-align: left;
        }
        .topbar-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .avatar-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          background: var(--color-primary-500);
          color: #fff;
          border: none;
          font-weight: 700;
          font-size: var(--text-xs);
          cursor: pointer;
        }
      `}</style>
    </header>
  );
}
