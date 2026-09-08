"use client";

import { create } from "zustand";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type Workspace = {
  id: string;
  name: string;
};

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  user: AuthUser | null;
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  status: AuthStatus;
  fetchSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchWorkspace: (id: string) => void;
};

// Único workspace fake por ahora — no hay tabla de workspaces en la DB todavía.
const FAKE_WORKSPACES: Workspace[] = [{ id: "ws-demo", name: "Mi Empresa" }];

/**
 * Fuente de verdad de la sesión: la cookie httpOnly `tt_session` + la tabla
 * `Session` en MySQL. Este store solo cachea en memoria lo que el server
 * devuelve — no persiste nada en localStorage.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  workspaces: [],
  activeWorkspaceId: null,
  status: "idle",

  fetchSession: async () => {
    set({ status: "loading" });
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        set({ user: null, status: "unauthenticated" });
        return;
      }
      const { user } = await res.json();
      set({
        user,
        workspaces: FAKE_WORKSPACES,
        activeWorkspaceId: FAKE_WORKSPACES[0].id,
        status: "authenticated",
      });
    } catch {
      set({ user: null, status: "unauthenticated" });
    }
  },

  login: async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.error ?? "No se pudo iniciar sesión.");
    }

    set({
      user: data.user,
      workspaces: FAKE_WORKSPACES,
      activeWorkspaceId: FAKE_WORKSPACES[0].id,
      status: "authenticated",
    });
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    set({ user: null, activeWorkspaceId: null, status: "unauthenticated" });
  },

  switchWorkspace: (id) => set({ activeWorkspaceId: id }),
}));
