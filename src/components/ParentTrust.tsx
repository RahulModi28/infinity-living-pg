import { ShieldCheck, Camera, UserCheck, Sparkles, PhoneCall, KeyRound, MapPin } from "lucide-react";
import Figure from "./ui/Figure";
import Reveal from "./ui/Reveal";
import SplitText from "./ui/SplitText";
import Button from "./ui/Button";
import { site } from "@/lib/site";

const POINTS = [
  { icon: KeyRound, t: "Secure premises", d: "Biometric entry at the main door — no shared keys floating around." },
  { icon: Camera, t: "CCTV", d: "[CAMERA COVERAGE & AREAS — CONFIRM]" },
  { icon: UserCheck, t: "Professional management", d: "On-site staff, a name and number you can call." },
  { icon: Sparkles, t: "Clean environment", d: "Regular housekeeping in rooms and common areas." },
  { icon: MapPin, t: "Convenient location", d: "Short walk to Christ University Yeshwanthpur Campus." },
  { icon: PhoneCall, t: "Reliable support", d: "[EMERGENCY CONTACT & RESPONSE PROCESS — CONFIRM]" },
];

export default function ParentTrust() {
  return (
    <section
      aria-labelledby="parents-heading"
      className="border-y border-ink/8 bg-ivory-2 py-14 sm:py-24 lg:py-32"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <Figure
          src="/images/entrance.jpg"
          alt="The entrance at Infinity Space PG near Christ University Yeshwanthpur Campus, Bengaluru"
          className="aspect-[4/5] rounded-[1.5rem]"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />

        <div>
          <Reveal>
            <p className="t-label flex items-center gap-3 text-moss">
              <ShieldCheck className="size-4" aria-hidden="true" />
              For parents
            </p>
          </Reveal>
          <SplitText
            as="h2"
            id="parents-heading"
            text="A place you'll feel comfortable sending them to."
            className="t-section mt-5 block max-w-[18ch]"
          />
          <Reveal delay={0.1}>
            <p className="t-body mt-6 max-w-[50ch] text-mute">
              You&apos;re not booking a room — you&apos;re handing over responsibility for someone.
              Here is what we can tell you, plainly, and what we&apos;ll confirm in writing before
              you pay anything.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, t, d }) => (
              <Reveal key={t}>
                <div className="flex gap-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-moss" aria-hidden="true" />
                  <div>
                    <dt className="font-display text-[1.0625rem] tracking-[-0.015em]">{t}</dt>
                    <dd
                      className={`mt-1 text-[0.9375rem] leading-relaxed ${
                        d.includes("[") ? "text-mute/70" : "text-mute"
                      }`}
                    >
                      {d}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-ink/12 bg-ivory p-6">
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                <strong className="font-medium">Come and see it first.</strong> We&apos;d rather you
                visit, meet the staff and look at the actual room than book from photos. Call{" "}
                <a href={`tel:${site.contact.phoneHref}`} data-cta="call" className="link-u font-medium">
                  {site.contact.phoneDisplay}
                </a>{" "}
                and we&apos;ll fix a time.
              </p>
              <Button href="#enquire" variant="ghost" className="mt-5 !px-5 !py-3 !text-[0.875rem]">
                Arrange a parent visit
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
