import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client (so entrance animations set their "from"
 * state before paint and never flash), useEffect on the server.
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
