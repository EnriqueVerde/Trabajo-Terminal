"use client";

import { useEffect } from "react";

/**
 * Dispara `handler` cuando se presiona `key` (con o sin ctrl/cmd según
 * `withMeta`). Usado para el atajo ⌘K / Ctrl+K del command palette.
 */
export function useKeyPress(
  key: string,
  handler: () => void,
  { withMeta = false }: { withMeta?: boolean } = {}
) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const matchesKey = e.key.toLowerCase() === key.toLowerCase();
      const matchesMeta = withMeta ? e.metaKey || e.ctrlKey : true;
      if (matchesKey && matchesMeta) {
        e.preventDefault();
        handler();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler, withMeta]);
}
