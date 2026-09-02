import { Sunrise, Sun, CupSoda, Moon, SprayCan } from "lucide-react";
import Figure from "./ui/Figure";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

/**
 * One card per meal, photo and text together.
 *
 * The previous layout had five photo tiles in one row and four text cards in
 * another, so nothing lined up — the third tile wasn't the third meal. Four
 * meals, four photographs, paired.
 */
const MEALS = [
  {
    icon: Sunrise,
    name: "Breakfast",
    time: "7:00 – 10:00 am",
    menu: "Dosa, paratha, chilla, pasta — it changes daily.",
    src: "/images/food-breakfast.jpg",
    alt: "Breakfast at Infinity Space PG, Yeshwanthpur — masala dosa with sambar and coconut chutney",
  },
  {
    icon: Sun,
    name: "Lunch",
    time: "12:00 – 2:00 pm",
    menu: "Dal, rice, roti and a sabzi — rajma, kofta, dal makhani.",
    src: "/images/food-lunch.jpg",
    alt: "Lunch at Infinity Space PG near Christ University Yeshwanthpur — dal, rice, roti, bhindi and cabbage sabzi",
  },
  {
    icon: CupSoda,
    name: "Evening snacks",
    time: "4:00 – 6:00 pm",
    menu: "Momos, samosas, vada pav, chilli potato.",
    src: "/images/food-snack.jpg",
    alt: "Evening snack served at Infinity Space PG, Yeshwanthpur, Bengaluru",
  },
  {
    icon: Moon,
    name: "Dinner",
    time: "8:00 – 9:30 pm",
    menu: "Pav bhaji, palak paneer, chole bhature, fried rice.",
    src: "/images/food-dinner.jpg",
    alt: "Dinner at Infinity Space PG, Yeshwanthpur — curry with naan and rice",
  },
];

export default function Food() {
  return (
    <section className="bg-ivory py-14 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Food"
          title="Four meals a day, Monday to Friday."
          intro="Breakfast, lunch, evening snacks and dinner, cooked on site and eaten a floor above the noise. Saturday evening the kitchen rests."
        />

        {/* Swipeable on phones, grid from tablet up — same pattern as Rooms. */}
        <div className="no-bar edge-fade -mx-5 mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:[mask-image:none] lg:grid-cols-4 lg:gap-7">
          {MEALS.map(({ icon: Icon, name, time, menu, src, alt }) => (
            <div key={name} className="w-[68vw] shrink-0 snap-start sm:w-auto">
              <Reveal>
                <figure>
                  <Figure
                    src={src}
                    alt={alt}
                    className="aspect-[4/5] rounded-[1.25rem]"
                    sizes="(max-width: 640px) 68vw, (max-width: 1024px) 45vw, 21rem"
                  />
                  <figcaption className="mt-4">
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-[1.15rem] text-clay" aria-hidden="true" />
                      <h3 className="font-display text-lg tracking-[-0.02em]">{name}</h3>
                    </span>
                    <p className="t-label mt-2 text-mute">{time}</p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-mute/80">{menu}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          ))}
        </div>


        <Reveal>
          <figure className="mt-12">
            <Figure
              src="/images/dining-hall.jpg"
              alt="The rooftop dining hall at Infinity Space PG, Yeshwanthpur — glass-walled, with tables, a water purifier and a city view"
              className="aspect-[16/10] rounded-[1.5rem] sm:aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 80rem"
            />
            <figcaption className="mt-4 text-[0.875rem] leading-relaxed text-mute">
              Meals are served in the rooftop dining hall — glass-walled, open on all sides, and
              a floor above the noise.
            </figcaption>
          </figure>
        </Reveal>

        {/* Hygiene was its own card competing with the meals; it belongs here,
            as a line parents can scan. */}
        <Reveal>
          <p className="mt-10 flex max-w-2xl items-start gap-2.5 text-[0.8125rem] leading-relaxed text-mute">
            <SprayCan className="mt-[0.15em] size-4 shrink-0 text-moss" aria-hidden="true" />
            <span>
              Cooked on site in our own kitchen. The menu rotates through the week &mdash; ask us
              for the current one.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
