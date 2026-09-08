"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Crumb = { label: string; href?: string };

const ROUTE_LABELS: Record<string, string> = {
  "": "Inicio",
  settings: "Configuración",
  "modulo-ejemplo": "Módulo de ejemplo",
  detalle: "Detalle",
};

/** Convierte un pathname en una lista de crumbs usando ROUTE_LABELS. */
export function pathnameToCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: ROUTE_LABELS[""] }];

  let acc = "";
  return segments.map((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === segments.length - 1;
    return {
      label: ROUTE_LABELS[seg] ?? seg,
      href: isLast ? undefined : acc,
    };
  });
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="breadcrumbs">
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          {i > 0 && <ChevronRight size={14} />}
          {crumb.href ? (
            <Link href={crumb.href}>{crumb.label}</Link>
          ) : (
            <span className="crumb-current">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
