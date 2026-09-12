"use client";

const LABEL = process.env.NEXT_PUBLIC_ENV_LABEL;

/** Banner opcional de "estás en dev/QA" — no se renderiza si no hay label. */
export function EnvironmentBanner() {
  if (!LABEL) return null;
  return <div className="env-banner">{LABEL}</div>;
}
