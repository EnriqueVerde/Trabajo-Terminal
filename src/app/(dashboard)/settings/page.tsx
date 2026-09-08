"use client";

import { useAuthStore } from "@/stores/auth.store";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Configuración</h1>
      <div className="card" style={{ padding: "var(--space-6)", maxWidth: 480 }}>
        <div className="input-group">
          <label className="input-label">Nombre</label>
          <input className="input" style={{ paddingLeft: "var(--space-3)" }} defaultValue={user?.name} disabled />
        </div>
        <div className="input-group">
          <label className="input-label">Email</label>
          <input className="input" style={{ paddingLeft: "var(--space-3)" }} defaultValue={user?.email} disabled />
        </div>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
          Página de ejemplo — conectá tu formulario real cuando tengas backend.
        </p>
      </div>
    </div>
  );
}
