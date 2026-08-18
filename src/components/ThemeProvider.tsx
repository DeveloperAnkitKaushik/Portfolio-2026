"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  /** Pass the button's centre so the reveal circle starts from it. */
  toggle: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const STORAGE_KEY = "portfolio-theme";
const CHANGE_EVENT = "portfolio-theme-change";

/**
 * Inlined in <head> so the stored theme is applied before first paint —
 * without this the page flashes dark before switching to light.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.classList.toggle("light",t==="light");document.documentElement.dataset.theme=t}catch(e){}})()`;

// The <html> element is the source of truth — the inline script writes it
// before React exists, so React subscribes to it rather than owning it.
const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
};

const getSnapshot = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";

const getServerSnapshot = (): Theme => "dark";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const apply = useCallback((next: Theme) => {
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode and blocked storage are fine — the theme just won't persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = getSnapshot() === "dark" ? "light" : "dark";

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || !origin || reduced) {
        apply(next);
        return;
      }

      const { x, y } = origin;
      // Radius needed to reach whichever viewport corner is furthest away.
      const end = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      /*
        A view transition is what lets the real new page show through the
        growing circle — it captures both themes as snapshots and clips between
        them. The cost is that the clip runs on the main thread and the last
        frame repaints the live page, so heavy sections can hitch near the end.
        That's the deliberate trade for seeing actual content during the wipe.

        Looping animations keep advancing behind the frozen snapshot, so without
        pausing they'd jump forward by the whole duration the moment it's
        dropped. Pausing is appearance-neutral here: a paused loop looks exactly
        like the snapshot covering it.
      */
      const root = document.documentElement;
      root.dataset.themeTransition = "";

      const transition = document.startViewTransition(() => apply(next));

      transition.ready.then(() => {
        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`],
          },
          {
            // Short and eased-out: the hitch lands in the final stretch, so the
            // less time spent crawling through it, the better it reads.
            duration: 500,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });

      transition.finished.finally(() => {
        delete root.dataset.themeTransition;
      });
    },
    [apply]
  );

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
