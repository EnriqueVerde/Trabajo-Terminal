import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { EnvironmentBanner } from "@/components/layout/EnvironmentBanner";
import { Providers } from "./providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Trabajo Terminal",
  description: "Cascarón de dashboard listo para arrancar un proyecto nuevo",
};

const THEME_INIT_SCRIPT = `
  try {
    var raw = localStorage.getItem('trabajo-terminal-ui');
    var theme = raw ? JSON.parse(raw).state.theme : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <EnvironmentBanner />
        <NextTopLoader color="#750946" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
