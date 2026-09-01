"use client";

import { forwardRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "light" | "whatsapp";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.975] " +
  "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const sizes = "px-6 py-3.5 text-[0.9375rem] sm:px-7 sm:py-4 sm:text-base";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory hover:bg-clay shadow-[0_1px_2px_rgba(18,17,16,0.16)] hover:shadow-[0_10px_28px_-8px_rgba(200,98,47,0.55)]",
  ghost:
    "border border-ink/18 text-ink hover:border-ink/45 hover:bg-ink/[0.04]",
  light:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/55",
  whatsapp:
    "bg-[#1f8b4d] text-white hover:bg-[#1a7742] shadow-[0_10px_28px_-10px_rgba(31,139,77,0.7)]",
};

export type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { children, variant = "primary", className = "", arrow = false, href, ...rest },
  ref
) {
  const cls = `${base} ${sizes} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="size-[1.05em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...rest}>
      {inner}
    </button>
  );
});

export default Button;
