"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(true);

  useEffect(() => {
    // Only enable if pointer is fine (mouse) and no reduced-motion requested
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      setIsTouchOrReducedMotion(true);
      return;
    }

    setIsTouchOrReducedMotion(false);

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);

        const target = e.target as HTMLElement | null;
        if (target) {
          const clickable = target.closest("a, button, input, textarea, select, [role='button'], summary");
          setIsPointer(!!clickable);
        }
      });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchOrReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer ambient glow dot */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
          isPointer
            ? "h-8 w-8 bg-purple-500/20 border border-purple-500/50 scale-125"
            : "h-4 w-4 bg-purple-500/10 border border-purple-500/30"
        }`}
      />
      {/* Core pinpoint dot */}
      <div
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500 transition-all ${
          isPointer ? "h-1.5 w-1.5 bg-purple-400" : "h-1 w-1"
        }`}
      />
    </div>
  );
}
