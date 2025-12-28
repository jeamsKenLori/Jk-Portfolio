import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

/* === Reveal on scroll (same pattern as other sections) === */
function useReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) setVisible(false);
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

const fadeStyle = (show, delay = 0) => ({
  opacity: show ? 1 : 0,
  transform: show ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
               transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

export default function Socials() {
  const heading = useReveal();
  const cardsReveal = [useReveal(), useReveal(), useReveal()];
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Icons from Simple Icons CDN (no local SVG components)
  const socials = [
    {
      name: "Facebook",
      handle: "@jeamsred19",
      href: "https://facebook.com/jeamsred19",
      icon: "https://cdn.simpleicons.org/facebook/1877F2",
    },
    {
      name: "Instagram",
      handle: "@seanblu_9",
      href: "https://instagram.com/seanblu_9",
      icon: "https://cdn.simpleicons.org/instagram/E4405F",
    },
    {
      name: "Telegram",
      handle: "@Jklori",
      href: "https://t.me/Jklori",
      icon: "https://cdn.simpleicons.org/telegram/229ED9",
    },
  ];

  const scrollToTop = () => {
    try {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <section id="socials" className="relative overflow-hidden scroll-mt-24">
      {/* subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 md:pt-24 md:pb-28">
        {/* Heading (Skills.jsx style) */}
        <div className="text-center" ref={heading.ref} style={fadeStyle(heading.isVisible, 0)}>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Connect{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              with Me
            </span>
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-24 sm:w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
            style={fadeStyle(heading.isVisible, 120)}
          />
        </div>

        {/* Portrait cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {socials.map(({ name, handle, href, icon }, i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${name} – ${handle}`}
              ref={cardsReveal[i].ref}
              style={fadeStyle(cardsReveal[i].isVisible, i * 120)}
              className="
                group relative block
                w-full max-w-[300px] md:max-w-[320px]
                h-[400px] md:h-[420px]
                rounded-[28px] p-8
                border border-zinc-200/60 bg-white/60 text-zinc-900
                shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                backdrop-blur supports-[backdrop-filter]:bg-white/60
                dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-white
                transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-200/30
                dark:hover:shadow-sky-900/30
                focus:outline-none focus:ring-2 focus:ring-sky-400
              "
            >
              {/* top accent bar */}
              <span
                aria-hidden
                className="absolute inset-x-6 top-6 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 opacity-70"
              />

              {/* content */}
              <div className="h-full flex flex-col items-center justify-center gap-6">
                <img
                  src={icon}
                  alt={`${name} icon`}
                  className="w-16 h-16 object-contain select-none transition-transform duration-300 group-hover:scale-110"
                  draggable="false"
                  loading="lazy"
                />

                <div className="mt-2 text-2xl sm:text-3xl font-semibold text-center">{name}</div>

                <div className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">{handle}</div>

                {/* subtle divider */}
                <div className="w-16 h-[2px] rounded bg-zinc-300/70 dark:bg-zinc-700/70 mt-2" />

                {/* hint */}
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">Tap to open</div>
              </div>

              {/* external arrow on hover */}
              <span className="absolute right-5 top-5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Back to top button (optional) */}
      {showUp && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed right-5 bottom-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full
                     bg-sky-500 text-white shadow-lg hover:bg-sky-600 focus:outline-none
                     focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-700"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </section>
  );
}
