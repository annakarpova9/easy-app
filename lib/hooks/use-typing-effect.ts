"use client";

import { useEffect, useRef } from "react";

export function useTypingEffect(variants: string[]) {
  const placeholderRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = variants[index];
      const speed = deleting ? 40 : 120;

      if (!placeholderRef.current) return;

      if (!deleting) {
        charIndex++;
        placeholderRef.current.placeholder = `Например, ${current.slice(0, charIndex)}`;

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 800);
          return;
        }
      } else {
        charIndex--;
        placeholderRef.current.placeholder = `Например, ${current.slice(0, charIndex)}`;

        if (charIndex === 0) {
          deleting = false;
          index = (index + 1) % variants.length;
        }
      }

      setTimeout(tick, speed);
    }

    tick();
  }, [variants]);

  return placeholderRef;
}
