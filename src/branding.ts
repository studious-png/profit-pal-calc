export interface BrandingConfig {
  appName: string;
  subtitle: string;
  logoUrl?: string;
  faviconUrl?: string;
  fontFamily?: string;
  colors: {
    background: string;
    panel: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    danger: string;
    warning: string;
  };
}

export const BRANDING: BrandingConfig = {
  appName: "The Liquidation Matrix",
  subtitle: "Hyper-fast liquidation and risk-based sizing engine for leverage trading.",
  logoUrl: undefined,
  faviconUrl: "/favicon.ico",
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  colors: {
    background: "#0a0a0c",
    panel: "#16161a",
    surface: "#0a0a0c",
    textPrimary: "#ffffff",
    textSecondary: "#a1a1aa",
    accent: "#00ff88",
    danger: "#ff2a2a",
    warning: "#facc15",
  },
};

export function applyBranding(config: BrandingConfig): void {
  document.title = config.appName;

  if (config.faviconUrl) {
    let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = config.faviconUrl;
  }

  const root = document.documentElement;
  root.style.setProperty("--color-bg", config.colors.background);
  root.style.setProperty("--color-panel", config.colors.panel);
  root.style.setProperty("--color-surface", config.colors.surface);
  root.style.setProperty("--color-text-primary", config.colors.textPrimary);
  root.style.setProperty("--color-text-secondary", config.colors.textSecondary);
  root.style.setProperty("--color-accent", config.colors.accent);
  root.style.setProperty("--color-danger", config.colors.danger);
  root.style.setProperty("--color-warning", config.colors.warning);

  if (config.fontFamily) {
    root.style.setProperty("--font-brand", config.fontFamily);
  }
}
