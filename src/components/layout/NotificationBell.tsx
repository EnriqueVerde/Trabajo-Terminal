"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

type Notification = { id: string; title: string; body: string };

/**
 * Stub sin socket real. Cuando conectes tu backend, reemplazá
 * `FAKE_NOTIFICATIONS` por un hook que escuche tu websocket/polling.
 */
const FAKE_NOTIFICATIONS: Notification[] = [
  { id: "1", title: "Bienvenido", body: "Este es un ejemplo de notificación." },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(FAKE_NOTIFICATIONS);

  return (
    <div style={{ position: "relative" }}>
      <button className="btn btn-ghost" style={{ padding: "var(--space-2)" }} onClick={() => setOpen((o) => !o)}>
        <Bell size={18} />
        {items.length > 0 && (
          <span
            className="badge badge-danger"
            style={{ position: "absolute", top: -4, right: -4, padding: "0 5px" }}
          >
            {items.length}
          </span>
        )}
      </button>
      {open && (
        <div className="dropdown-panel" style={{ right: 0, top: "calc(100% + 8px)", width: 300 }}>
          {items.length === 0 && (
            <div style={{ padding: "var(--space-3)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
              Sin notificaciones.
            </div>
          )}
          {items.map((n) => (
            <button
              key={n.id}
              className="dropdown-item"
              style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}
              onClick={() => setItems((cur) => cur.filter((i) => i.id !== n.id))}
            >
              <strong style={{ fontSize: "var(--text-sm)" }}>{n.title}</strong>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{n.body}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
