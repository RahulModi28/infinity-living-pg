import { Check, Minus } from "lucide-react";
import { rooms } from "@/lib/site";
import Reveal from "./ui/Reveal";

/**
 * A scannable rent comparison. "with price" / "room rent" / "pg price" are
 * among the highest-intent searches in this micro-market, but the rent was
 * previously only visible inside individual room cards — nothing let someone
 * compare the three options, or see what the rent actually covers.
 *
 * Two renderings rather than one scrolling table:
 *
 *  - Phones get a price row plus a single inclusions list. A 34rem table
 *    inside a ~21rem column would have to scroll sideways, which is both
 *    poor UX and — because a min-width that large propagates out as a
 *    min-content contribution — enough to make Chrome widen the mobile
 *    layout viewport, leaving a dead strip down the right of every section.
 *  - From `sm` up, where the column is wide enough, the real table.
 *
 * The mobile block is `sm:hidden` and the table `hidden sm:block`, so only
 * one is ever in layout — a `display:none` table contributes no width.
 */

const INCLUDED = [
  { label: "Furnished room, bed & mattress", all: true },
  { label: "Wardrobe & study desk", all: true },
  { label: "High-speed Wi-Fi", all: true },
  { label: "Housekeeping", all: true },
  { label: "Electricity", note: "[CONFIRM — included up to a limit?]" },
  { label: "Meals", note: "[CONFIRM — bundled or charged separately?]" },
  { label: "Security deposit", note: "[SECURITY DEPOSIT — CONFIRM]" },
];

const unconfirmed = INCLUDED.filter((r) => !r.all);

export default function PriceTable() {
  return (
    <Reveal>
      <div className="mt-14 overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ivory-2 sm:mt-16">
        {/* ── Phones ── */}
        <div className="sm:hidden">
          <h3 className="t-label border-b border-ink/12 px-5 py-4 text-mute">Monthly rent</h3>
          <dl
            className="grid divide-x divide-ink/10 border-b border-ink/12"
            style={{ gridTemplateColumns: `repeat(${rooms.length}, minmax(0, 1fr))` }}
          >
            {rooms.map((r) => (
              <div key={r.id} className="px-3 py-4 text-center">
                <dt className="text-[0.75rem] leading-tight text-mute">{r.name}</dt>
                <dd className="mt-1.5 font-display text-[1.0625rem] text-clay">₹{r.price}</dd>
                <dd className="mt-0.5 text-[0.6875rem] leading-tight text-mute">{r.priceNote}</dd>
              </div>
            ))}
          </dl>
          <div className="px-5 py-5">
            <h4 className="t-label text-mute">What the rent covers</h4>
            <ul className="mt-3 space-y-2.5">
              {INCLUDED.map((row) => (
                <li
                  key={row.label}
                  className={`flex items-start gap-2.5 text-[0.875rem] leading-snug ${
                    row.all ? "text-ink-2" : "text-mute/70"
                  }`}
                >
                  {row.all ? (
                    <Check className="mt-[0.2em] size-4 shrink-0 text-moss" aria-hidden="true" />
                  ) : (
                    <Minus className="mt-[0.2em] size-4 shrink-0 text-mute/40" aria-hidden="true" />
                  )}
                  {row.label}
                  {!row.all && <span className="sr-only"> — to be confirmed</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Tablet and up ── */}
        <div className="hidden sm:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Monthly rent and inclusions by room type at Infinity Space, Yeshwanthpur
            </caption>
            <thead>
              <tr className="border-b border-ink/12">
                <th scope="col" className="t-label px-5 py-4 text-mute sm:px-7">
                  Monthly rent
                </th>
                {rooms.map((r) => (
                  <th key={r.id} scope="col" className="px-5 py-4 sm:px-7">
                    <span className="block font-display text-[1.0625rem] tracking-[-0.02em]">
                      {r.name}
                    </span>
                    <span className="mt-1 block font-display text-lg text-clay">₹{r.price}</span>
                    <span className="mt-0.5 block text-[0.75rem] font-normal text-mute">
                      {r.priceNote}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INCLUDED.map((row) => (
                <tr key={row.label} className="border-b border-ink/8 last:border-0">
                  <th
                    scope="row"
                    className={`px-5 py-3.5 text-[0.875rem] font-normal sm:px-7 ${
                      row.all ? "text-ink-2" : "text-mute/75"
                    }`}
                  >
                    {row.label}
                  </th>
                  {rooms.map((r) => (
                    <td key={r.id} className="px-5 py-3.5 sm:px-7">
                      {row.all ? (
                        <>
                          <Check className="size-4 text-moss" aria-hidden="true" />
                          <span className="sr-only">Included</span>
                        </>
                      ) : (
                        <>
                          <Minus className="size-4 text-mute/40" aria-hidden="true" />
                          <span className="sr-only">To be confirmed</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-ink/12 px-5 py-4 sm:px-7">
          <p className="text-[0.8125rem] leading-relaxed text-mute">
            Still being confirmed: {unconfirmed.map((r) => r.label.toLowerCase()).join(", ")}. We&apos;ll
            put the full inclusion list in writing before you pay anything, so there are no
            surprises in month two.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
