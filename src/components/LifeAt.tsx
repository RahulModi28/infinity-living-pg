import Figure from "./ui/Figure";
import Reveal from "./ui/Reveal";
import SplitText from "./ui/SplitText";

export default function LifeAt() {
  return (
    <section className="relative overflow-hidden bg-ivory-2 py-14 sm:py-24 lg:py-36">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Tall hero image, offset */}
          <div className="lg:col-span-5 lg:pt-16">
            <Figure
              src="/images/gym.jpg"
              alt="The gym at Infinity Living PG near Christ University Yeshwanthpur Campus — treadmills, cross trainer and weights"
              className="aspect-[4/3] rounded-[1.5rem]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              parallax={6}
            />
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <p className="t-label flex items-center gap-3 text-clay">
                <span className="inline-block h-px w-8 bg-current opacity-50" aria-hidden="true" />
                Life at Infinity Living
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text="More than a room. It's your everyday space."
              className="t-section mt-5 block max-w-[16ch]"
            />
            <Reveal delay={0.1}>
              <p className="t-body mt-6 max-w-[46ch] text-mute">
                Mornings that start with breakfast instead of a commute. Evenings in the common area
                arguing about assignments. A room that&apos;s quiet when you need it to be. This is
                the part a floor plan can&apos;t show you.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <Figure
                src="/images/living-room-2.jpg"
                alt="The shared living room at Infinity Living PG, Yeshwanthpur, Bengaluru"
                className="aspect-[4/3] rounded-[1.25rem] sm:mt-10"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
              <Figure
                src="/images/entry-biometric.jpg"
                alt="Biometric entry at Infinity Living PG, Yeshwanthpur, Bengaluru"
                className="hidden aspect-[3/4] rounded-[1.25rem] sm:block"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1.4fr_1fr] sm:items-end">
              <Figure
                src="/images/room-double.jpg"
                alt="A double sharing room at Infinity Living PG near Christ University Yeshwanthpur Campus"
                className="hidden aspect-[16/10] rounded-[1.25rem] sm:block"
                sizes="(max-width: 640px) 100vw, 35vw"
              />
              <Reveal>
                <blockquote className="border-l-2 border-clay pl-5 text-[0.9375rem] leading-relaxed text-ink-2">
                  &ldquo;Everything you need for college life, under one roof.&rdquo;
                  <footer className="mt-2 text-[0.8125rem] text-mute">
                    What we&rsquo;re actually building here.
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
