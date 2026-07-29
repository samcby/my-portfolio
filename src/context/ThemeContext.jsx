"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  resetToSystemTheme: () => {},
});

const THEME_EVENT = "portfolio-theme-change";

function hasManualTheme() {
  return window.localStorage.getItem("userThemeChoice") === "true";
}

function getThemeSnapshot() {
  if (hasManualTheme()) {
    return window.localStorage.getItem("theme") === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeToTheme(onStoreChange) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if (!hasManualTheme()) onStoreChange();
  };
  const handleStorage = (event) => {
    if (!event.key || event.key === "theme" || event.key === "userThemeChoice") {
      onStoreChange();
    }
  };

  mediaQuery.addEventListener("change", handleSystemChange);
  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_EVENT, onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", handleSystemChange);
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_EVENT, onStoreChange);
  };
}

function notifyThemeChange() {
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeProvider({ children }) {
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", isDarkMode);
    root.classList.toggle("light", !isDarkMode);
    root.style.colorScheme = isDarkMode ? "dark" : "light";

    const timeout = window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [isDarkMode]);

  const toggleTheme = () => {
    window.localStorage.setItem("userThemeChoice", "true");
    window.localStorage.setItem("theme", getThemeSnapshot() ? "light" : "dark");
    notifyThemeChange();
  };

  const resetToSystemTheme = () => {
    window.localStorage.removeItem("theme");
    window.localStorage.removeItem("userThemeChoice");
    notifyThemeChange();
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, resetToSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
