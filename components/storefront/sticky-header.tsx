"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const originRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const origin = originRef.current;
    if (!origin) return;

    // Observe the original slot, not the moving header, to avoid a feedback loop.
    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(origin);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={originRef}
      className="pointer-events-none absolute inset-x-1 top-2 z-40 h-16 lg:inset-x-5 lg:top-9 lg:h-[76px]"
    >
      <div
        className={cn(
          "pointer-events-auto h-16 lg:h-[76px]",
          isSticky
            ? "fixed inset-x-0 top-0 animate-[storefront-header-enter_250ms_ease-out] shadow-sm motion-reduce:animate-none [&>header]:rounded-none"
            : "relative",
        )}
      >
        {children}
      </div>
    </div>
  );
}
