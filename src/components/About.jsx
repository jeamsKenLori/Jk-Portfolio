import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Hook: reveal on scroll using IntersectionObserver */
function useReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion: show immediately
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
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

// Inline fade helper (stagger with delay)
const fadeStyle = (show, delay = 0) => ({
  opacity: show ? 1 : 0,
  transform: show ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

export default function About() {
  const [showUp, setShowUp] = useState(false);

  // flip + modal states
  const [flipped, setFlipped] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Reveal hooks
  const heading = useReveal();
  const photo = useReveal();
  const copy = useReveal();

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll to top, clear hash, then reset active link underline
  const scrollToTopAndReset = () => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    try {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
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

  // Close modal on ESC + prevent page scroll when modal open
  useEffect(() => {
    if (!openModal) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenModal(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openModal]);

  return (
    <section id="about" className="relative overflow-hidden scroll-mt-24">
      {/* soft vignette background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* balanced spacing top & bottom */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24 md:pt-28 md:pb-28">
        {/* Heading (fade on scroll) */}
        <div className="text-center" ref={heading.ref} style={fadeStyle(heading.isVisible, 0)}>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-24 sm:w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
            style={fadeStyle(heading.isVisible, 120)}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Photo (flip card) */}
          <div className="flex justify-center" ref={photo.ref} style={fadeStyle(photo.isVisible, 80)}>
            {/* perspective wrapper */}
            <div className="w-full max-w-sm" style={{ perspective: "1200px" }}>
              {/* flip button container */}
              <button
                type="button"
                onClick={() => setFlipped((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlipped((v) => !v);
                  }
                }}
                aria-label={flipped ? "Flip card to show photo" : "Flip card to show actions"}
                className="group w-full text-left focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-2xl"
              >
                {/* inner (rotates) */}
                <div
                  className="relative rounded-2xl transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="
                      rounded-2xl ring-1 ring-zinc-200/60 dark:ring-zinc-800 overflow-hidden
                      shadow-xl transform-gpu
                      transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                      hover:scale-[1.04] hover:shadow-2xl hover:shadow-sky-200/40
                      dark:hover:shadow-sky-900/40
                    "
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}images/grad_pic.jpg`}
                        alt="Portrait / Graduation photo"
                        className="
                          w-full h-full object-cover transform-gpu
                          transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                          group-hover:scale-110
                        "
                        draggable="false"
                      />
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="
                      absolute inset-0 rounded-2xl
                      ring-1 ring-zinc-200/60 dark:ring-zinc-800
                      shadow-xl
                      overflow-hidden
                    "
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* blurred background image layer */}
                    <div
                      className="absolute inset-0 scale-110"
                      style={{
                        backgroundImage: "url('/images/about_bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(14px)",
                      }}
                    />

                    {/* dark overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* content */}
                    <div className="relative z-10 flex h-full items-center justify-center p-6">
                      <div className="w-full text-center">
                        <div className="text-xl sm:text-2xl font-semibold text-white">
                          Want to know more?
                        </div>
                        <p className="mt-2 text-sm text-zinc-200">
                          See my education background and hobbies.
                        </p>

                        <div className="mt-6 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent flip toggle
                              setOpenModal(true);
                            }}
                            className="
                              inline-flex items-center justify-center
                              rounded-full px-6 py-2.5
                              bg-sky-500 text-white font-semibold
                              shadow-lg hover:bg-sky-600
                              focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-700
                            "
                          >
                            Know More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Content (fade on scroll) */}
          <div
            ref={copy.ref}
            style={fadeStyle(copy.isVisible, 160)}
            className="text-[20px] leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            <p>
              I’m currently studying at Cavite State University – Silang Campus. I am 21 years old,
              the oldest of the siblings. With a background in both design and coding, I created this
              portfolio that not only looks great but also performs well. I’m constantly learning new
              techniques and staying updated with the latest trends in the tech world.
            </p>

            <p className="mt-5">
              When I’m not writing code, you’ll find me watching different movies, exploring when there
              is free time, or playing mobile games. I believe that this portfolio will give me an
              opportunity to create something unique, and I’m always excited to take on new challenges.
              If you’d like to collaborate or have any questions, feel free to reach out — I’d love to
              hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div
          className="
            fixed inset-0 z-[60] flex items-center justify-center px-4
          "
          role="dialog"
          aria-modal="true"
          aria-label="More about me"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpenModal(false);
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* modal box */}
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-white/90 dark:bg-zinc-900/85 backdrop-blur shadow-2xl overflow-hidden max-h-[85vh] sm:max-h-none">
            <div className="flex items-start justify-between gap-4 p-6 border-b border-zinc-200/60 dark:border-zinc-800">
              <div>
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                  More About Me
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Education background and hobbies
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto sm:overflow-visible max-h-[calc(85vh-120px)] sm:max-h-none">
              {/* EDUCATION */}
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Education Background
                </h4>
                <ul className="mt-3 space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                    <span>
                      <b>Cavite State University – Silang Campus</b> — (Currently Studying)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                    <span>
                      <b>Philippine Christian University - Dasmariñas Campus</b> — (2020-2022)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                    <span>
                      <b>Paliparan 2 Integrated Highschool</b> — (2016-2020)
                    </span>
                  </li>
                </ul>
              </div>

              {/* HOBBIES */}
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Hobbies
                </h4>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Eating",
                      poster: "/images/hobby-eat.png",
                      gif: "/images/hobby-eat.gif",
                    },
                    {
                      label: "Exploring / Going Out",
                      poster: "/images/hobby-explore.png",
                      gif: "/images/hobby-explore.gif",
                    },
                    {
                      label: "Playing mobile games",
                      poster: "/images/hobby-games.png",
                      gif: "/images/hobby-games.gif",
                    },
                    {
                      label: "Learning new tech",
                      poster: "/images/hobby-tech.png",
                      gif: "/images/hobby-tech.gif",
                    },
                  ].map((hobby) => (
                    <div
                      key={hobby.label}
                      className="group relative overflow-hidden rounded-2xl border
                                 border-zinc-200/60 dark:border-zinc-700/60
                                 min-h-[120px] md:min-h-[150px]"
                    >
                      {/* Poster (always visible) */}
                      <img
                        src={hobby.poster}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover scale-110"
                        draggable="false"
                      />

                      {/* GIF (ONLY exists on hover => plays only on hover) */}
                      <img
                        src={hobby.gif}
                        alt=""
                        className="absolute inset-0 hidden h-full w-full object-cover scale-110 group-hover:block"
                        draggable="false"
                      />

                      {/* Overlay for readability */}
                      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-200" />

                      {/* CENTERED CONTENT */}
                      <div className="relative z-10 h-full px-5 py-5 flex flex-col items-center justify-center text-center gap-2">
                        <span className="text-3xl">{hobby.emoji}</span>
                        <span className="text-base font-semibold text-white">
                          {hobby.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sticky Close button (mobile only) */}
                <div className="sticky bottom-4 z-20 flex justify-end pt-4 sm:static sm:pt-6">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="rounded-full px-5 py-2.5 font-semibold
                               bg-sky-500 text-white hover:bg-sky-600
                               focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to top button */}
      {showUp && (
        <button
          type="button"
          onClick={scrollToTopAndReset}
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
