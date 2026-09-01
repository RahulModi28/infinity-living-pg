import { Check } from "lucide-react";
import { rooms, depositFor } from "@/lib/site";
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

// Every row here is included in the rent. A deposit is a separate payment,
// not something the rent covers, so it does not belong in this table.
const INCLUDED = [
  "Furnished room, bed & mattress",
  "Wardrobe & study desk",
  "High-speed Wi-Fi",
  "Housekeeping",
  "Electricity",
  "Four meals a day",
  "Laundry service",
];

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
              {INCLUDED.map((label) => (
                <li
                  key={label}
                  className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink-2"
                >
                  <Check className="mt-[0.2em] size-4 shrink-0 text-moss" aria-hidden="true" />
                  {label}
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
              {INCLUDED.map((label) => (
                <tr key={label} className="border-b border-ink/8 last:border-0">
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-[0.875rem] font-normal text-ink-2 sm:px-7"
                  >
                    {label}
                  </th>
                  {rooms.map((r) => (
                    <td key={r.id} className="px-5 py-3.5 sm:px-7">
                      <Check className="size-4 text-moss" aria-hidden="true" />
                      <span className="sr-only">Included</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-ink/12 px-5 py-4 sm:px-7">
          <p className="text-[0.8125rem] leading-relaxed text-mute">
            Everything above is included in the rent — electricity and meals are not billed on
            top. We&apos;ll put the full inclusion list in writing before you pay anything.
          </p>
          {/* Not the table row back — that belonged in a list of inclusions and
              a deposit is not one. But two months' rent is a large enough sum
              that finding it out only in the FAQ would feel like a catch. */}
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-mute">
            <span className="font-medium text-ink-2">Security deposit</span> is two months&apos;
            rent, paid once on move-in —{" "}
            {rooms.map((r, i) => (
              <span key={r.id}>
                {i > 0 ? ", " : ""}₹{depositFor(r)} for {r.name.toLowerCase()}
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </Reveal>
  );
}
