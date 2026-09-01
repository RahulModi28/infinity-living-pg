"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Conversion tracking.
 *
 * Inert until you set the env vars — nothing loads, nothing is sent, and no
 * consent banner is required while it's off:
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX      # GA4
 *   NEXT_PUBLIC_META_PIXEL_ID=123456…   # Meta pixel (optional)
 *
 * Every contact route is tagged `data-cta="call|whatsapp|enquire"`, so the
 * three things worth measuring — calls, WhatsApp opens, form submits — are
 * captured automatically without touching each component.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GA = process.env.NEXT_PUBLIC_GA_ID;
const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Call this from anywhere to record a conversion. */
export function trackLead(action: string, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", action, { event_category: "lead", ...detail });
  window.fbq?.("track", action === "enquiry_submitted" ? "Lead" : "Contact", detail);
}

export default function Analytics() {
  useEffect(() => {
    if (!GA && !META) return;

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cta]") as HTMLElement | null;
      if (!el) return;
      const kind = el.dataset.cta;
      if (!kind) return;
      trackLead(`${kind}_click`, { location: el.closest("section")?.id || "global" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA && !META) return null;

  return (
    <>
      {GA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
              window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}
          </Script>
        </>
      )}
      {META && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
