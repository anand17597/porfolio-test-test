import { useEffect } from "react";

/**
 * Keep motion support enabled. Only rescue elements that remain hidden well after first paint.
 * This preserves normal framer-motion / whileInView behavior while preventing permanent blank sections.
 */
export function ProductionMotionFallback() {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const hiddenSince = new WeakMap<HTMLElement, number>();

    const shouldSkip = (el: Element) =>
      !!(
        el.closest("nav") ||
        el.closest("header") ||
        el.closest("footer") ||
        el.closest('[role="dialog"]') ||
        el.closest("[data-keep-hidden]")
      );

    const inViewport = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      return r.bottom >= -80 && r.top <= vh + 80 && r.width > 6 && r.height > 6;
    };

    const nudgeObservers = () => {
      try {
        window.dispatchEvent(new Event("resize"));
        const y = window.scrollY || 0;
        window.scrollTo(0, y + 1);
        requestAnimationFrame(() => {
          window.scrollTo(0, y);
          window.dispatchEvent(new Event("scroll"));
        });
      } catch {
        /* no-op */
      }
    };

    const rescueStuck = () => {
      const root = document.getElementById("root");
      if (!root) return;
      const scope = (root.querySelector("main") as HTMLElement | null) ?? root;
      const now = Date.now();

      scope.querySelectorAll("*").forEach((node) => {
        const el = node as HTMLElement;
        if (shouldSkip(el) || !inViewport(el)) return;

        const cs = window.getComputedStyle(el);
        const hiddenByOpacity = parseFloat(cs.opacity || "1") <= 0.06;
        const hiddenByVisibility = cs.visibility === "hidden";
        const inlineHidden = el.style.opacity === "0" || el.style.visibility === "hidden";

        if (!(hiddenByOpacity || hiddenByVisibility || inlineHidden)) {
          hiddenSince.delete(el);
          return;
        }

        const firstSeen = hiddenSince.get(el) ?? now;
        hiddenSince.set(el, firstSeen);
        const hiddenForMs = now - firstSeen;

        // Give animation/IO time to run; only force-visible if it is clearly stuck.
        if (hiddenForMs < 2200) return;

        el.style.setProperty("opacity", "1", "important");
        if (hiddenByVisibility) el.style.setProperty("visibility", "visible", "important");
        if (/translate/i.test(el.style.transform || "")) {
          el.style.setProperty("transform", "none", "important");
        }
      });
    };

    const onTick = () => {
      nudgeObservers();
      rescueStuck();
    };

    const ids = [80, 260, 800, 1600, 2600, 4200].map((ms) => window.setTimeout(onTick, ms));
    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);
    window.addEventListener("load", onTick);

    return () => {
      ids.forEach(clearTimeout);
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
      window.removeEventListener("load", onTick);
    };
  }, []);

  return null;
}
