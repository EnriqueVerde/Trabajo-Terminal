"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, Settings2, LayoutGrid } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import { useKeyPress } from "@/lib/hooks/useKeyPress";

type PaletteItem = {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
  section: string;
};

/** Lista estática — sumá acá cualquier ruta que quieras buscable por ⌘K. */
const ITEMS: PaletteItem[] = [
  { id: "home", label: "Inicio", href: "/", icon: Home, section: "Navegación" },
  { id: "settings", label: "Configuración", href: "/settings", icon: Settings2, section: "Navegación" },
  { id: "example", label: "Módulo de ejemplo", href: "/modulo-ejemplo", icon: LayoutGrid, section: "Módulos" },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  useKeyPress("k", () => setCommandPaletteOpen(!commandPaletteOpen), { withMeta: true });
  useKeyPress("Escape", () => setCommandPaletteOpen(false));

  const filtered = useMemo(
    () => ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const sections = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    filtered.forEach((item) => {
      map.set(item.section, [...(map.get(item.section) ?? []), item]);
    });
    return Array.from(map.entries());
  }, [filtered]);

  if (!commandPaletteOpen) return null;

  function go(item: PaletteItem) {
    router.push(item.href);
    setCommandPaletteOpen(false);
    setQuery("");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      go(filtered[selected]);
    }
  }

  return (
    <div className="command-overlay" onClick={() => setCommandPaletteOpen(false)}>
      <div className="command-panel" onClick={(e) => e.stopPropagation()}>
        <div className="command-input-row">
          <Search size={18} />
          <input
            autoFocus
            placeholder="Buscar páginas, acciones…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={onKeyDown}
          />
          <kbd className="badge">Esc</kbd>
        </div>

        {sections.length === 0 && <div className="command-empty">Sin resultados.</div>}

        {sections.map(([section, items]) => (
          <div key={section}>
            <div className="command-section-label">{section}</div>
            {items.map((item) => {
              const Icon = item.icon;
              const isSelected = filtered[selected]?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`command-item ${isSelected ? "selected" : ""}`}
                  onMouseEnter={() => setSelected(filtered.indexOf(item))}
                  onClick={() => go(item)}
                >
                  <Icon size={16} />
                  {item.label}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
