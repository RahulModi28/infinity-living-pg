import { Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";
import Logo from "./Logo";

const NAV = [
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

const SOCIAL = [{ href: site.social.instagram, label: "Instagram", icon: Instagram }];

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo className="text-[1.1rem]" />
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/60">
              Premium student accommodation in Yeshwanthpur, Bengaluru — near Christ University,
              Yeshwanthpur Campus. Furnished rooms, meals, Wi-Fi and a short walk to class.
            </p>
            <ul className="mt-7 flex gap-2.5">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors duration-300 hover:border-white/45 hover:bg-white/10"
                  >
                    <Icon className="size-[1.05rem]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="t-label text-white/40">Explore</h2>
            <ul className="mt-3 -mx-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-u inline-flex min-h-11 items-center px-2 text-[0.9375rem] text-white/72 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-label text-white/40">Get in touch</h2>
            <ul className="mt-5 space-y-3.5 text-[0.9375rem] text-white/72">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-[1.05rem] shrink-0 text-clay" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.city}, {site.address.state}{" "}
                  {site.address.postalCode}
                  <br />
                  <span className="text-white/45">Near Christ University — Yeshwanthpur Campus</span>
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-[1.05rem] shrink-0 text-clay" aria-hidden="true" />
                <a href={`tel:${site.contact.phoneHref}`} data-cta="call" className="link-u inline-flex min-h-11 items-center hover:text-white">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-[1.05rem] shrink-0 text-clay" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="link-u inline-flex min-h-11 items-center hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="size-[1.05rem] shrink-0 text-clay" aria-hidden="true" />
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u inline-flex min-h-11 items-center hover:text-white"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Yeshwanthpur, Bengaluru, Karnataka.
          </p>
          <ul className="flex gap-6">
            <li>
              <a href="/privacy" className="link-u inline-flex min-h-11 items-center hover:text-white/80">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="link-u inline-flex min-h-11 items-center hover:text-white/80">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
