import { useEffect, useState } from "react";

/**
 * Picks the section whose center crosses near the middle of the viewport.
 * Also:
 *  - updates immediately on hash navigation (#skills, etc.)
 *  - clears when URL has no hash (or "#")
 *  - still supports your manual "resetActiveId" event
 *
 * Use with: useActiveId(['about','skills','projects','contact'])
 */
export default function useActiveId(sectionIds = []) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // --- IntersectionObserver that watches the viewport center line ---
    // We set big negative top/bottom margins so an element is "intersecting"
    // when its box includes the vertical center of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        // Keep only entries that intersect our center band
        const visible = entries.filter((e) => e.isIntersecting);

        if (visible.length > 0) {
          // Choose the one with the highest intersection ratio
          // (closest to the center line)
          const best = visible.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];
          if (best?.target?.id) setActiveId(best.target.id);
          return;
        }

        // Fallback: pick the section whose top is nearest the center line
        const centerY = window.innerHeight / 2;
        let closest = null;
        let closestDist = Infinity;
        for (const el of sections) {
          const r = el.getBoundingClientRect();
          const dist = Math.abs(r.top - centerY);
          if (dist < closestDist) {
            closestDist = dist;
            closest = el;
          }
        }
        if (closest?.id) setActiveId(closest.id);
      },
      {
        // These margins create a thin "band" around the center; when the
        // band intersects an element, it's considered visible/active.
        // Tune top/bottom if you prefer slightly above/below center.
        root: null,
        rootMargin: "-48% 0px -48% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));

    // Helpers
    const isRootHash =
      !window.location.hash || window.location.hash === "#";
    const reset = () => setActiveId("");

    // Hash navigation: immediately reflect the target section in the navbar
    const onHashChange = () => {
      if (isRootHash) {
        reset();
      } else {
        const id = window.location.hash.slice(1);
        if (sectionIds.includes(id)) setActiveId(id);
      }
    };

    // Also clear when at top with no hash
    const onScrollTopClear = () => {
      if (window.scrollY <= 2 && isRootHash) reset();
    };

    // Initial value
    onHashChange();

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resetActiveId", reset);
    window.addEventListener("scroll", onScrollTopClear, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resetActiveId", reset);
      window.removeEventListener("scroll", onScrollTopClear);
    };
  }, [sectionIds]);

  return activeId;
}
    