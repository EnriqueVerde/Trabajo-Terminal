export default function DashboardHome() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Inicio</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        Esta es la página de inicio del cascarón. Reemplazá este contenido y
        agregá tus módulos en <code>src/lib/constants/nav.ts</code>.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
        {["Usuarios", "Módulos activos", "Notificaciones"].map((label, i) => (
          <div key={label} className="card" style={{ padding: "var(--space-5)" }}>
            <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              {label}
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, marginTop: "var(--space-2)" }}>{[1, 1, 0][i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
