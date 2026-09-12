"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import { MAIN_MENU_ITEMS, MODULE_MENU_ITEMS, type NavItem } from "@/lib/constants/nav";
import clsx from "clsx";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, openNavGroups, toggleNavGroup } = useUIStore();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function renderItem(item: NavItem) {
    const active = isActive(item.href);
    const hasSubItems = !!item.subItems?.length;
    const isOpen = openNavGroups.includes(item.id);
    const Icon = item.icon;

    return (
      <div key={item.id}>
        <div
          className={clsx("sidebar-link", active && "active")}
          onClick={() => hasSubItems && toggleNavGroup(item.id)}
        >
          <Link
            href={hasSubItems ? item.subItems![0].href : item.href}
            className="sidebar-link-main"
            style={{ borderLeftColor: active ? item.color ?? "var(--color-primary-500)" : "transparent" }}
          >
            <Icon size={18} />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </Link>
          {hasSubItems && !sidebarCollapsed && (
            <ChevronDown
              size={14}
              className={clsx("sidebar-chevron", isOpen && "open")}
              onClick={(e) => {
                e.preventDefault();
                toggleNavGroup(item.id);
              }}
            />
          )}
        </div>
        {hasSubItems && isOpen && !sidebarCollapsed && (
          <div className="sidebar-subgroup">
            {item.subItems!.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className={clsx("sidebar-sublink", pathname === sub.href && "active")}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <aside
      className="sidebar"
      style={{ width: sidebarCollapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)" }}
    >
      <div className="sidebar-brand">
        <Image src="/escudo-ipn.png" alt="IPN" width={28} height={28} style={{ flexShrink: 0 }} />
        {!sidebarCollapsed && <span>Trabajo Terminal</span>}
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">{!sidebarCollapsed && "PRINCIPAL"}</div>
        {MAIN_MENU_ITEMS.map(renderItem)}

        {MODULE_MENU_ITEMS.length > 0 && (
          <>
            <div className="sidebar-section-label">{!sidebarCollapsed && "MÓDULOS"}</div>
            {MODULE_MENU_ITEMS.map(renderItem)}
          </>
        )}
      </nav>

      <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
        {sidebarCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
      </button>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          background: var(--color-sidebar-bg);
          color: var(--color-sidebar-text);
          display: flex;
          flex-direction: column;
          transition: width var(--transition-normal);
          z-index: 40;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-5) var(--space-4);
          font-weight: 700;
          font-size: var(--text-lg);
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
        }
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 0 var(--space-2) var(--space-4);
        }
        .sidebar-section-label {
          padding: var(--space-4) var(--space-3) var(--space-1);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #6f7896;
          min-height: 1.2em;
        }
        :global(.sidebar-link) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-sm);
          margin-bottom: 2px;
          cursor: pointer;
        }
        :global(.sidebar-link:hover) {
          background: var(--color-sidebar-bg-hover);
        }
        :global(.sidebar-link.active) {
          background: var(--color-sidebar-bg-hover);
          color: var(--color-sidebar-text-active);
        }
        :global(.sidebar-link-main) {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          flex: 1;
          border-left: 3px solid transparent;
          white-space: nowrap;
          overflow: hidden;
          color: inherit;
        }
        :global(.sidebar-chevron) {
          margin-right: var(--space-3);
          transition: transform var(--transition-fast);
        }
        :global(.sidebar-chevron.open) {
          transform: rotate(180deg);
        }
        :global(.sidebar-subgroup) {
          display: flex;
          flex-direction: column;
          padding-left: calc(var(--space-4) + 18px + var(--space-3));
          gap: 2px;
          margin-bottom: var(--space-2);
        }
        :global(.sidebar-sublink) {
          padding: var(--space-2) var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-sidebar-text);
          border-radius: var(--radius-sm);
        }
        :global(.sidebar-sublink:hover) {
          background: var(--color-sidebar-bg-hover);
        }
        :global(.sidebar-sublink.active) {
          color: var(--color-sidebar-text-active);
          font-weight: 600;
        }
        .sidebar-collapse-btn {
          border: none;
          background: transparent;
          color: var(--color-sidebar-text);
          padding: var(--space-3);
          cursor: pointer;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sidebar-collapse-btn:hover {
          color: #fff;
        }
      `}</style>
    </aside>
  );
}
