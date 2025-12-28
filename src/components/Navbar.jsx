import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import useActiveId from "../hooks/useActiveId";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}

export default function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#socials", label: "Socials" },
  ];

  const activeId = useActiveId(navItems.map((n) => n.href.replace("#", "")));

  const scrollToTopAndReset = () => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }

    const checkAtTop = () => {
      if (window.scrollY <= 2) {
        window.dispatchEvent(new Event("resetActiveId"));
      } else {
        requestAnimationFrame(checkAtTop);
      }
    };
    requestAnimationFrame(checkAtTop);
  };

  // ✅ Underline animation (hover + active)
  const baseUnderline =
    "relative inline-block " +
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full " +
    "after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-cyan-400 " +
    "after:origin-left after:scale-x-0 after:transform " +
    "after:transition-transform after:duration-300 after:ease-out " +
    "hover:after:scale-x-100";

  const activeUnderline = "after:scale-x-100";

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (open) setOpen(false);
              scrollToTopAndReset();
            }}
            className="text-zinc-700 dark:text-zinc-100 text-xl font-bold tracking-tight cursor-pointer"
            aria-label="Go to top"
          >
            <span className="text-zinc-400">{'{ '}</span>
            JK Portfolio
            <span className="text-zinc-400">{' }'}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((n) => {
              const isActive = activeId === n.href.replace("#", "");
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className={[
                    "text-lg sm:text-xl font-medium transition-colors",
                    baseUnderline,
                    isActive
                      ? `text-zinc-900 dark:text-white ${activeUnderline}`
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border
                         border-zinc-300 hover:border-zinc-400 dark:border-zinc-700/60 dark:hover:border-zinc-600"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border
                         border-zinc-300 hover:border-zinc-400 dark:border-zinc-700/60 dark:hover:border-zinc-600"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border
                         border-zinc-300 hover:border-zinc-400 dark:border-zinc-700/60 dark:hover:border-zinc-600"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {navItems.map((n) => {
              const isActive = activeId === n.href.replace("#", "");
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "py-2 text-lg transition-colors font-medium",
                    baseUnderline,
                    isActive
                      ? `text-zinc-900 dark:text-white ${activeUnderline}`
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                  ].join(" ")}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
