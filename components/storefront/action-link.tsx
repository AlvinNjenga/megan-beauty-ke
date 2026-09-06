import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ActionLink({ href, children, className }: ActionLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "h-12 gap-2 rounded-2xl bg-white px-6 text-lg font-bold text-foreground shadow-[0_4px_8px_#0000001f] hover:bg-accent focus-visible:ring-ring",
        className,
      )}
    >
      {children}
      <span className="flex size-6 items-center justify-center rounded-full bg-black/15" aria-hidden="true">
        <ChevronRight className="size-5 text-white" />
      </span>
    </a>
  );
}
