"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, Moon, Sun } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { LoginBackground } from "./LoginBackground";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const { theme, toggleTheme } = useUIStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!email || !password) throw new Error("Completá email y contraseña.");
      await login(email, password);
      router.push(searchParams.get("redirect") || "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <LoginBackground />

      <button className="btn btn-ghost theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      <div className="card login-card">
        <div className="login-logo">
          <Image src="/escudo-ipn.png" alt="IPN" width={40} height={40} />
          <span>Trabajo Terminal</span>
        </div>
        <p className="login-subtitle">Iniciá sesión para continuar</p>

        {error && <div className="badge badge-danger" style={{ width: "100%", marginBottom: "var(--space-3)" }}>{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrap">
              <Mail size={16} />
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vos@empresa.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <div className="input-wrap">
              <Lock size={16} />
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
            {loading ? <Loader2 size={16} className="spin" /> : "Ingresar"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .theme-toggle {
          position: fixed;
          top: var(--space-5);
          right: var(--space-5);
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          padding: var(--space-8);
        }
        .login-logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-weight: 700;
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
        }
        .login-subtitle {
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          margin-bottom: var(--space-6);
        }
        :global(.spin) {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
