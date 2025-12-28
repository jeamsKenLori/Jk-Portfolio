// Footer.jsx
import React from "react";
import { Copyright } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="
        w-full border-t border-zinc-200/70 dark:border-zinc-700/60
        bg-zinc-100/80 dark:bg-zinc-900/90
        backdrop-blur supports-[backdrop-filter]:bg-zinc-100/80
        dark:supports-[backdrop-filter]:bg-zinc-900/90
        text-zinc-800 dark:text-zinc-200
      "
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12 md:py-16">
        {/* Brand + Quote */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
            {`{ JK Portfolio }`}
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-400 max-w-sm">
            “Building my path in front-end development, one line of code at a time.”
          </p>
        </div>

        {/* Quick Links */}
        <nav className="md:mx-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <a
                href="#about"
                className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#socials"
                className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                Socials
              </a>
            </li>
          </ul>
        </nav>

        {/* Inquiries */}
        <div className="md:ml-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
            For Inquiries
          </h3>
          <p className="mt-3">
            <span className="font-semibold text-zinc-900 dark:text-white">Email:</span>{" "}
            <a
              href="mailto:jeamsred23@gmail.com"
              className="text-zinc-700 dark:text-zinc-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              jeamsred23@gmail.com
            </a>
          </p>
          <p className="mt-2">
            <span className="font-semibold text-zinc-900 dark:text-white">Contact No.:</span>{" "}
            <a
              href="tel:+639764534680"
              className="text-zinc-700 dark:text-zinc-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              +63-976-453-4680
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div
        className="
          border-t border-zinc-200/70 dark:border-zinc-700/60
          bg-zinc-200/60 dark:bg-zinc-950/60
          text-zinc-700 dark:text-zinc-400
        "
      >
        <div className="flex items-center justify-center gap-2 py-3 text-sm">
          <Copyright className="h-4 w-4" />
          <span>
            {year} {`{ JK Portfolio }`}. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
