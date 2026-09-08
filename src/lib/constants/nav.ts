import type { LucideIcon } from "lucide-react";
import { Home, Settings2, LayoutGrid } from "lucide-react";

export type NavSubItem = {
  label: string;
  href: string;
  permission?: string;
  requiresModule?: string | string[];
};

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  moduleKey?: string;
  color?: string;
  subItems?: NavSubItem[];
};

/** Items siempre visibles, sin gating por módulo/permiso. */
export const MAIN_MENU_ITEMS: NavItem[] = [
  { id: "home", label: "Inicio", icon: Home, href: "/" },
  { id: "settings", label: "Configuración", icon: Settings2, href: "/settings" },
];

/**
 * Acá van tus módulos reales. Cada uno puede tener sub-items, un color de
 * acento y un `moduleKey` para ocultarlo según el workspace/plan activo.
 * Dejamos un solo ejemplo ilustrativo — borralo cuando agregues los tuyos.
 */
export const MODULE_MENU_ITEMS: NavItem[] = [
  {
    id: "example-module",
    label: "Módulo de ejemplo",
    icon: LayoutGrid,
    href: "/modulo-ejemplo",
    moduleKey: "example",
    color: "#750946",
    subItems: [
      { label: "Resumen", href: "/modulo-ejemplo" },
      { label: "Detalle", href: "/modulo-ejemplo/detalle", permission: "example:read" },
    ],
  },
];
