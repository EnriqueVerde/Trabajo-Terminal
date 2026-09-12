"use client";

/** Fondo decorativo simple para la pantalla de login. Reemplazá a gusto. */
export function LoginBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "radial-gradient(circle at 20% 20%, rgba(117,9,70,0.22), transparent 45%), radial-gradient(circle at 80% 70%, rgba(99,101,105,0.18), transparent 45%), var(--color-bg-body)",
      }}
    />
  );
}
