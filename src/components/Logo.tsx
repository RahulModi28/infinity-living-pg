export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 22" className="h-[1.15em] w-auto" aria-hidden="true" fill="none">
        <path
          d="M11 3.2c4.4 0 6.1 7.6 9.5 7.6S25 3.2 29.4 3.2c4 0 7.1 3.4 7.1 7.6s-3.1 7.6-7.1 7.6c-4.4 0-6.1-7.6-9.5-7.6s-4.5 7.6-8.9 7.6C7 18.4 3.9 15 3.9 10.8S7 3.2 11 3.2Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[1.05em] font-semibold tracking-[-0.02em]">
        Infinity Living
      </span>
    </span>
  );
}
