import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function ActionLink({ href, children, className, tone = "light" }: ActionLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant: tone === "dark" ? "default" : "secondary" }),
        "h-12 gap-2 rounded-2xl px-6 text-lg font-bold shadow-[0_4px_8px_#0000001f] focus-visible:ring-ring",
        tone === "dark" ? "bg-foreground text-white hover:bg-foreground/85" : "bg-white text-foreground hover:bg-accent",
        className,
      )}
    >
      {children}
      <span className={cn("flex size-6 items-center justify-center rounded-full", tone === "dark" ? "bg-white/20" : "bg-black/15")} aria-hidden="true">
        <ChevronRight className="size-5 text-white" />
      </span>
    </a>
  );
}
