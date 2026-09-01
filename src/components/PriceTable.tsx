import { Check, Minus } from "lucide-react";
import { rooms } from "@/lib/site";
import Reveal from "./ui/Reveal";

/**
 * A scannable rent comparison. "with price" / "room rent" / "pg price" are
 * among the highest-intent searches in this micro-market, but the rent was
 * previously only visible inside individual room cards — nothing let someone
 * compare the three options side by side, or see what the rent covers.
 *
 * Scrolls horizontally on phones rather than collapsing into stacked cards,
 * which would just repeat the room cards above it.
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

export default function PriceTable() {
  return (
    <Reveal>
      <div className="mt-16 overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ivory-2">
        <div className="no-bar overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Monthly rent and inclusions by room type at Infinity Living, Yeshwanthpur
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
                    <span className="mt-1 block font-display text-lg text-clay">
                      ₹{r.price}
                    </span>
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
            Rows marked with a dash are still being confirmed:{" "}
            {INCLUDED.filter((r) => r.note)
              .map((r) => r.label.toLowerCase())
              .join(", ")}
            . We&apos;ll put the full inclusion list in writing before you pay anything, so
            there are no surprises in month two.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
