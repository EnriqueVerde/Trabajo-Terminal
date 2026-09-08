export default function ExampleModulePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Módulo de ejemplo</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        Así se ve un módulo colgado del sidebar con sub-items. Duplicá esta
        carpeta (<code>src/app/(dashboard)/modulo-ejemplo</code>) para armar
        los tuyos, y agregá la entrada correspondiente en{" "}
        <code>src/lib/constants/nav.ts</code>.
      </p>
    </div>
  );
}
