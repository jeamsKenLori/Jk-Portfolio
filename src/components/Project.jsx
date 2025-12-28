import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

/** Reveal on scroll (same as your About/Skills) */
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

const fadeStyle = (show, delay = 0) => ({
  opacity: show ? 1 : 0,
  transform: show ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

export default function Projects() {
  const heading = useReveal();

  // 🖼️ Add your image paths per project here
  const projects = [
    {
      title: "ITEC Dictionary App",
      desc:
        "A web-based attendance management system that records student entry via RFID scans and automatically sends SMS notifications to guardians, with role-based access for administrators and faculty.",
      tech: ["Laravel", "Tailwind", "MySQL", "JavaScript"],
      img: "/images/ICA-East Attendance Web App/ICA Login.png",
      images: [
        "/images/ICA-East Attendance Web App/(1).png",
        "/images/ICA-East Attendance Web App/(2).png",
        "/images/ICA-East Attendance Web App/(3).png",
        "/images/ICA-East Attendance Web App/(4).png",
        "/images/ICA-East Attendance Web App/(5).png",
        "/images/ICA-East Attendance Web App/(6).png",
        "/images/ICA-East Attendance Web App/(7).png",
        "/images/ICA-East Attendance Web App/(8).png",
        "/images/ICA-East Attendance Web App/(9).png",
        "/images/ICA-East Attendance Web App/(10).png",
        "/images/ICA-East Attendance Web App/(11).png",
        "/images/ICA-East Attendance Web App/(12).png",
        "/images/ICA-East Attendance Web App/(13).png",
        "/images/ICA-East Attendance Web App/(14).png",
        "/images/ICA-East Attendance Web App/(15).png",
        "/images/ICA-East Attendance Web App/(16).png",
        "/images/ICA-East Attendance Web App/(17).png",
        "/images/ICA-East Attendance Web App/(18).png",
        "/images/ICA-East Attendance Web App/(19).png",
        "/images/ICA-East Attendance Web App/(20).png",
        "/images/ICA-East Attendance Web App/(21).png",
        "/images/ICA-East Attendance Web App/(22).png",
        "/images/ICA-East Attendance Web App/(23).png",
        "/images/ICA-East Attendance Web App/(24).png",
      ],
    },
    {
      title: "Infinity Estate",
      desc:
        "A real estate platform that allows users to browse, buy, and rent properties with detailed listings and inquiries.",
      tech: ["PHP", "Bootstrap", "HTML", "MySQL"],
      img: "/images/Infinity Estate/1.png",
      images: [
        "/images/Infinity Estate/1.png",
        "/images/Infinity Estate/2.png",
        "/images/Infinity Estate/3.png",
        "/images/Infinity Estate/4.png",
        "/images/Infinity Estate/5.png",
        "/images/Infinity Estate/6.png",
        "/images/Infinity Estate/7.png",
        "/images/Infinity Estate/8.png",
        "/images/Infinity Estate/9.png",
        "/images/Infinity Estate/10.png",
        "/images/Infinity Estate/11.png",
        "/images/Infinity Estate/12.png",
        "/images/Infinity Estate/13.png",
        "/images/Infinity Estate/14.png",
        "/images/Infinity Estate/15.png",
        "/images/Infinity Estate/16.png",
        "/images/Infinity Estate/17.png",
      ],
    },
    {
      title: "Claudy Nails",
      desc:
        "A web-based management system that helps the owner manage customers, appointments, and services efficiently.",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      img: "/images/Claudy Nails/1.png",
      images: [
        "/images/Claudy Nails/1.png",
        "/images/Claudy Nails/2.png",
        "/images/Claudy Nails/3.png",
        "/images/Claudy Nails/4.png",
        "/images/Claudy Nails/5.png",
        "/images/Claudy Nails/6.png",
        "/images/Claudy Nails/7.png",
        "/images/Claudy Nails/8.png",
        "/images/Claudy Nails/9.png",
        "/images/Claudy Nails/10.png",
        "/images/Claudy Nails/11.png",
        "/images/Claudy Nails/12.png",
        "/images/Claudy Nails/13.png",
        "/images/Claudy Nails/14.png",
        "/images/Claudy Nails/15.png",
        "/images/Claudy Nails/16.png",
        "/images/Claudy Nails/17.png",
        "/images/Claudy Nails/18.png",
        "/images/Claudy Nails/19.png",
        "/images/Claudy Nails/20.png",
        "/images/Claudy Nails/21.png",
        "/images/Claudy Nails/22.png",
        "/images/Claudy Nails/23.png",
        "/images/Claudy Nails/24.png",
      ],
    },
  ];

  // 🧠 Modal state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openViewer = (projIndex, startIndex = 0) => {
    setActiveProjectIndex(projIndex);
    setActiveImageIndex(startIndex);
    setViewerOpen(true);
  };
  const closeViewer = () => setViewerOpen(false);

  const images = projects[activeProjectIndex]?.images || [];
  const prevImage = () =>
    setActiveImageIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () =>
    setActiveImageIndex((i) => (i + 1) % images.length);

  // 🔒 Lock body scroll when modal open + ESC/arrow keys
  useEffect(() => {
    if (viewerOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") closeViewer();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [viewerOpen, images.length]);

  return (
    <section id="projects" className="relative overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24 md:pt-28 md:pb-28">
        {/* Header */}
        <div className="text-center" ref={heading.ref} style={fadeStyle(heading.isVisible, 0)}>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-24 sm:w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
            style={fadeStyle(heading.isVisible, 120)}
          />
          <p
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-zinc-700 dark:text-zinc-400"
            style={fadeStyle(heading.isVisible, 220)}
          >
            A selection of projects showcasing my skills and experience.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => {
            const card = useReveal();
            return (
              <article
                key={p.title}
                ref={card.ref}
                style={fadeStyle(card.isVisible, i * 120)}
                className="
                  group rounded-2xl overflow-hidden border
                  border-zinc-200/70 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  backdrop-blur supports-[backdrop-filter]:bg-white/70
                  transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:shadow-lg hover:shadow-sky-200/30
                  dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                  dark:hover:shadow-sky-500/20
                "
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.title} preview`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    draggable="false"
                  />
                </div>

                {/* Body */}
                <div className="px-6 py-6 md:px-8 md:py-7">
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {p.desc}
                  </p>

                  {/* Tech badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                                   bg-zinc-100 text-zinc-700
                                   dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* "View Images" button -> opens modal */}
                  <div className="mt-6">
                    <button
                      onClick={() => openViewer(i, 0)}
                      className="inline-flex items-center gap-2 rounded-xl
                                 bg-sky-600 px-4 py-2 text-sm font-semibold text-white
                                 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
                    >
                      <ImageIcon size={18} />
                      View Images
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 🪟 Image Viewer Modal */}
      {viewerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer for ${projects[activeProjectIndex]?.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeViewer}
          />
          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-5xl rounded-2xl border
                       border-zinc-200/60 bg-white/90 shadow-2xl
                       dark:border-zinc-800/70 dark:bg-zinc-900/90
                       overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200">
                {projects[activeProjectIndex]?.title}
              </div>
              <button
                onClick={closeViewer}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg
                           text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100
                           dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800
                           focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image area */}
            <div className="relative">
              {/* Nav buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full
                           bg-white/80 text-zinc-800 shadow hover:bg-white
                           dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-800
                           focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full
                           bg-white/80 text-zinc-800 shadow hover:bg-white
                           dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-800
                           focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Next image"
              >
                <ChevronRight />
              </button>

              {/* Image */}
              <div className="h-[60vh] sm:h-[70vh] w-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <img
                  src={images[activeImageIndex]}
                  alt={`Screenshot ${activeImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain select-none"
                  draggable="false"
                />
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  className={`
                    h-2.5 w-2.5 rounded-full transition
                    ${idx === activeImageIndex
                      ? "bg-sky-500"
                      : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
