import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const fullText = "Bringing pixels to life through code";
  const [displayed, setDisplayed] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  // Fade-in mount flag (inline styles handle the animation)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // typing loop effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 70;
    const pauseAfterFull = 1200;
    const pauseAfterDelete = 500;

    let timer;
    if (!isDeleting && index < fullText.length) {
      timer = setTimeout(() => setIndex((i) => i + 1), typingSpeed);
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => setIndex((i) => i - 1), typingSpeed);
    } else if (index === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseAfterFull);
    } else if (index === 0 && isDeleting) {
      timer = setTimeout(() => setIsDeleting(false), pauseAfterDelete);
    }
    setDisplayed(fullText.slice(0, index));
    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  // blinking caret
  useEffect(() => {
    const caret = setInterval(() => setShowCaret((c) => !c), 500);
    return () => clearInterval(caret);
  }, []);

  // helper for staggered inline fade-in
  const fade = (delayMs = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`,
    willChange: "opacity, transform",
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-24 pb-20 md:pt-0 md:pb-52">
        <div className="text-center">
          {/* HI, I'M */}
          <p
            style={fade(40)}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-snug text-zinc-900 dark:text-white"
          >
            HI, I’M
          </p>

          {/* Name */}
          <h1
            style={fade(160)}
            className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-cyan-600 dark:text-cyan-400">{'{ '}</span>
            <span
              className="mx-1 inline-block text-transparent bg-clip-text
              bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600
              dark:from-cyan-400 dark:via-sky-300 dark:to-blue-500"
            >
              JEAMS KENNETH LORILLA
            </span>
            <span className="text-cyan-600 dark:text-cyan-400">{' }'}</span>
          </h1>

          {/* Subtitle */}
          <p
            style={fade(280)}
            className="mt-8 text-xl sm:text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300"
          >
            <span className="font-medium">Student</span>
            <span className="mx-2">•</span>
            <span className="font-medium">Aspiring Front-End Developer</span>
          </p>

          {/* Typing line */}
          <p
            style={fade(380)}
            className="mt-5 text-lg sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-mono"
          >
            {displayed}
            <span
              className={`ml-1 inline-block w-[10px] bg-zinc-500 dark:bg-zinc-300 ${
                showCaret ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200`}
            >
              &nbsp;
            </span>
          </p>

          {/* Buttons */}
          <div
            style={fade(520)}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl
                         bg-sky-600 px-8 py-4 text-lg text-white font-semibold
                         hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
            >
              View Projects
            </a>

            <a
              href="#socials"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl
                         border px-8 py-4 text-lg font-semibold
                         border-zinc-300 text-zinc-900 hover:border-zinc-400
                         dark:border-zinc-700/70 dark:text-zinc-100 dark:hover:border-zinc-600
                         focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600
                         transition-all duration-300"
            >
              Contact Me
            </a>

            <a
              href="https://drive.google.com/file/d/1rbEP8MfCFFemqbl7_SGUbr6Evrtwm8-Q/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center rounded-xl
                         px-8 py-4 text-lg font-semibold text-zinc-600 dark:text-zinc-300
                         transition-colors duration-300 hover:text-zinc-900 dark:hover:text-white
                         focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-700 overflow-hidden"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl bg-sky-500/10 dark:bg-sky-400/10
                           opacity-0 scale-95 transform-gpu will-change-[transform,opacity] backdrop-blur-sm
                           transition-[opacity,transform] duration-500 ease-out
                           group-hover:opacity-100 group-hover:scale-100"
              />
              <span className="relative z-10">Download CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div
        style={fade(800)}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 sm:bottom-20 text-zinc-600 dark:text-zinc-300"
      >
        <ChevronDown className="animate-bounce w-8 h-8 sm:w-10 sm:h-10" />
      </div>
    </section>
  );
}
