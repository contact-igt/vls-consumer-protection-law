"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureUtmParams } from "@/lib/utm";
import useUTMSource from "@/components/utils/useUTMSource";

/** Fires the page_view analytics event once on mount, alongside capturing
 * UTM/referrer data early so it's available even if the visitor never
 * touches the form before navigating away. */
export function PageViewTracker() {
  useUTMSource();

  useEffect(() => {
    captureUtmParams();
    trackEvent("page_view");
  }, []);

  return null;
}
