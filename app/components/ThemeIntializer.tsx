"use client";

import { useEffect } from "react";
import { useTheme } from "../states/theme";

export function ThemeIntailzioer() {
  const { updateTheme } = useTheme();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    updateTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      updateTheme(e.matches ? "dark" : "light");
    };
  }, []);

  return null;
}
