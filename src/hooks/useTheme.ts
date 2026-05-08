import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("wswork_theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage indisponível
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("wswork_theme", theme);
    } catch {
      // silencia erros de escrita no localStorage
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggle };
}
