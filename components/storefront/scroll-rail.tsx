"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ScrollRailProps = {
  children: React.ReactNode;
  label: string;
  controlLabel?: string;
  className?: string;
  controlsClassName?: string;
};

export function ScrollRail({ children, label, controlLabel = "collections", className, controlsClassName }: ScrollRailProps) {
  const id = useId();
  const railRef = useRef<HTMLUListElement>(null);
  const [availability, setAvailability] = useState({ previous: false, next: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => setAvailability({
      previous: rail.scrollLeft > 2,
      next: rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 2,
    });
    update();
    rail.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function scroll(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width ?? rail.clientWidth) + gap),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className="relative">
      {(availability.previous || availability.next) && (
        <div className={cn("absolute right-5 -top-14 flex gap-2 lg:right-[3%]", controlsClassName)} aria-label={controlLabel + " controls"}>
          <Button variant="outline" size="icon" className="size-11 rounded-full bg-white/95" disabled={!availability.previous} aria-label={"Previous " + controlLabel} aria-controls={id} onClick={() => scroll(-1)}>
            <ChevronLeft className="size-5" />
          </Button>
          <Button variant="outline" size="icon" className="size-11 rounded-full bg-white/95" disabled={!availability.next} aria-label={"Next " + controlLabel} aria-controls={id} onClick={() => scroll(1)}>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      )}
      <ul
        id={id}
        ref={railRef}
        aria-label={label}
        className={cn("scrollbar-none flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 py-1 lg:scroll-px-[3vw] lg:gap-[1.4vw] lg:px-[3%]", className)}
      >
        {children}
      </ul>
    </div>
  );
}
