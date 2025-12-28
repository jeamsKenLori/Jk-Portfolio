import React, { useEffect, useRef, useState } from "react";
import { Code2, Monitor, Users, GraduationCap } from "lucide-react";

/** Hook: reveal on scroll */
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
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
  transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

export default function Skills() {
  const skills = [
    { icon: Code2, title: "Web Development", desc: "Creating the design, and functionality behind every website you visit." },
    { icon: Monitor, title: "Responsive Design", desc: "Making websites flexible, so they work beautifully everywhere." },
    { icon: Users, title: "Accessibility", desc: "Ensuring every user can access and enjoy the web." },
    { icon: GraduationCap, title: "Continuous Learning", desc: "Always learning, always improving." },
  ];

  const imageSkills = [
    { src: "/images/skills/js.png", name: "JavaScript", level: 20 },
    { src: "/images/skills/html.png", name: "HTML", level: 90 },
    { src: "/images/skills/tailwind.png", name: "Tailwind CSS", level: 60 },
    { src: "/images/skills/bootstrap.png", name: "Bootstrap", level: 60 },
    { src: "/images/skills/mysql.png", name: "MySQL", level: 80 },
    { src: "/images/skills/php.png", name: "PHP", level: 70 },
  ];

  const [open, setOpen] = useState(() => imageSkills.map(() => false));
  const toggleOpen = (idx) => setOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  const handleKey = (idx) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen(idx);
    }
  };

  const heading = useReveal();
  const subHeading = useReveal();

  return (
    <section id="skills" className="relative overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24 md:pt-28 md:pb-28">
        {/* ===== Section heading ===== */}
        <div className="text-center" ref={heading.ref} style={fadeStyle(heading.isVisible, 0)}>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Things I’m{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Good At
            </span>
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-24 sm:w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
            style={fadeStyle(heading.isVisible, 120)}
          />
        </div>

        {/* Top skill cards (already dual-mode) */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map(({ icon: Icon, title, desc }, i) => {
            const card = useReveal();
            return (
              <article
                key={title}
                ref={card.ref}
                style={fadeStyle(card.isVisible, i * 90)}
                className="
                  group relative rounded-2xl p-6 md:p-8
                  border border-zinc-200/60 dark:border-zinc-700/60
                  bg-white/60 dark:bg-zinc-800/60
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                  backdrop-blur supports-[backdrop-filter]:bg-white/60
                  dark:supports-[backdrop-filter]:bg-zinc-800/60
                  transform-gpu transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:shadow-lg hover:shadow-sky-200/30 dark:hover:shadow-sky-900/30
                "
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-sky-400/40 transition-colors duration-300" aria-hidden />
                <header className="flex items-center gap-4">
                  <Icon size={36} className="shrink-0 text-sky-500 dark:text-sky-400 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white transition-colors duration-300 group-hover:text-sky-500 dark:group-hover:text-sky-400">
                    {title}
                  </h3>
                </header>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                  {desc}
                </p>
              </article>
            );
          })}
        </div>

        {/* ====== What I Build With (now dual-mode like above) ====== */}
        <div className="mt-32 md:mt-40" ref={subHeading.ref} style={fadeStyle(subHeading.isVisible, 0)}>
          <h3 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            What I{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Build With
            </span>
          </h3>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-20 sm:w-24 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
            style={fadeStyle(subHeading.isVisible, 120)}
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {imageSkills.map(({ src, name, level }, i) => {
              const chip = useReveal();
              const isOpen = open[i];

              return (
                <div
                  key={name}
                  ref={chip.ref}
                  style={{ ...fadeStyle(chip.isVisible, i * 90) }}
                  className="relative w-full max-w-[340px]"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleOpen(i)}
                    onKeyDown={handleKey(i)}
                    aria-expanded={isOpen}
                    className={`
                      group relative w-full rounded-2xl
                      border border-zinc-200/60 dark:border-zinc-700/60
                      bg-white/60 dark:bg-zinc-800/60
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                      backdrop-blur supports-[backdrop-filter]:bg-white/60
                      dark:supports-[backdrop-filter]:bg-zinc-800/60
                      text-zinc-900 dark:text-white
                      transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                      hover:-translate-y-2 hover:scale-[1.02]
                      hover:shadow-lg hover:shadow-sky-200/30 dark:hover:shadow-sky-900/30
                      focus:outline-none focus:ring-2 focus:ring-sky-400
                      px-6 py-8 flex flex-col items-center text-center
                      ${isOpen ? "pb-4" : ""}
                    `}
                  >
                    <img
                      src={src}
                      alt={`${name} logo`}
                      className="w-16 h-16 object-contain select-none transition-transform duration-300 group-hover:scale-110"
                      draggable="false"
                    />
                    <div className="text-2xl font-semibold mt-4 transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-sky-300">
                      {name}
                    </div>
                    <div className="text-[12px] mt-2 text-zinc-500 dark:text-zinc-400">
                      {isOpen ? "(click to hide)" : "(click to show)"}
                    </div>

                    {/* Progress bar inside card */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-500 ease-out w-full
                        ${isOpen ? "mt-6 max-h-24 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
                      `}
                    >
                      <div className="w-full h-4 rounded-full overflow-hidden mb-3 bg-zinc-200/70 dark:bg-zinc-700/60">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-[width] duration-700"
                          style={{ width: isOpen ? `${level}%` : "0%" }}
                        />
                      </div>
                      <div className="text-base font-medium text-sky-600 dark:text-sky-400">
                        {level}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
