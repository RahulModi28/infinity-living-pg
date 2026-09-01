import SplitText from "./SplitText";
import Reveal from "./Reveal";
import type { ReactNode } from "react";

export default function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as = "h2",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h2" | "h3";
  children?: ReactNode;
}) {
  const muted = tone === "dark" ? "text-mute" : "text-white/60";
  const accent = tone === "dark" ? "text-clay" : "text-clay";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className={`t-label ${accent} flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="inline-block h-px w-8 bg-current opacity-50" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitText as={as} text={title} className="t-section mt-5 block" />
      {intro && (
        <Reveal delay={0.1}>
          <p className={`t-body mt-6 max-w-2xl ${muted} ${align === "center" ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
