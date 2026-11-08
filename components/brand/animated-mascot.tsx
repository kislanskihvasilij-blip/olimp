"use client";

/**
 * Маскот, который бежит, только пока виден на экране.
 * Анимация SVG перерисовывается на главном потоке, поэтому вне экрана её выключаем.
 */

import { useEffect, useRef, useState } from "react";
import { Mascot } from "@/components/brand/mascot";

type AnimatedMascotProps = { className?: string; label?: string };

const VIEWPORT_MARGIN = "120px";

export function AnimatedMascot({ className, label }: AnimatedMascotProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: VIEWPORT_MARGIN,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="inline-flex">
      <Mascot isAnimated={isVisible} label={label} className={className} />
    </span>
  );
}
