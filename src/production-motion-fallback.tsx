import { useEffect } from "react";

/** Unsticks motion nodes that stay at opacity:0 after load (IO / hydration edge cases on static hosts). */
export function ProductionMotionFallback() {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const unstick = () => {
      const root = document.getElementById("root");
      if (!root) return;
      const main = root.querySelector("main");
      const scope = main ?? root;

      const skip = (el: Element) =>
        !!(
          el.closest("nav") ||
          el.closest("header") ||
          el.closest("footer") ||
          el.closest('[role="dialog"]')
        );

      scope.querySelectorAll("*").forEach((node) => {
        const el = node as HTMLElement;
        if (skip(node)) return;
        if (el.style.opacity !== "0") return;
        el.style.opacity = "1";
        const tr = el.style.transform;
        if (tr && /translate/i.test(tr)) el.style.transform = "none";
        if (el.style.visibility === "hidden") el.style.visibility = "visible";
      });
    };

    const ids = [0, 100, 400, 1200, 2800].map((ms) => window.setTimeout(unstick, ms));
    window.addEventListener("scroll", unstick, { passive: true });
    window.addEventListener("resize", unstick);
    window.addEventListener("load", unstick);

    return () => {
      ids.forEach(clearTimeout);
      window.removeEventListener("scroll", unstick);
      window.removeEventListener("resize", unstick);
      window.removeEventListener("load", unstick);
    };
  }, []);

  return null;
}
