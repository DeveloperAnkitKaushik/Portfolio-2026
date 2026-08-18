"use client";

import { useRef } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";
import Nav from "./Nav";

export default function TopBar() {
  const { theme, toggle } = useTheme();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const rect = toggleRef.current?.getBoundingClientRect();
    toggle(
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
    );
  };

  return (
    <>
      {/* Sits above the menu panel so the theme toggle stays reachable while
          the menu is open. The menu supplies its own toggle button. */}
      <div className="fixed left-6 top-6 z-[9500]">
        <button
          ref={toggleRef}
          onClick={handleToggle}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="cursor-target grid h-11 w-11 place-items-center rounded-xl border border-line bg-card text-fg backdrop-blur transition-colors hover:bg-fg/10"
        >
          {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>
      </div>

      <Nav />
    </>
  );
}
