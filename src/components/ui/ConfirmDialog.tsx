"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ConfirmOptions = {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";
};

type ConfirmContextValue = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

/** Diálogo de confirmación imperativo: `const ok = await confirm({ title })`. */
export function useConfirm(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmContextValue>((opts) => {
    setOptions(opts);
    return new Promise<boolean>((resolve) => setResolver(() => resolve));
  }, []);

  function close(result: boolean) {
    resolver?.(result);
    setOptions(null);
    setResolver(null);
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {options && (
        <div className="command-overlay" onClick={() => close(false)}>
          <div
            className="card"
            style={{ maxWidth: 420, width: "100%", padding: "var(--space-6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: 0, marginBottom: "var(--space-2)" }}>{options.title}</h3>
            {options.message && (
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                {options.message}
              </p>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
              <button className="btn btn-ghost" onClick={() => close(false)}>
                {options.cancelText ?? "Cancelar"}
              </button>
              <button
                className={`btn ${options.variant === "danger" ? "btn-danger" : "btn-primary"}`}
                onClick={() => close(true)}
              >
                {options.confirmText ?? "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
