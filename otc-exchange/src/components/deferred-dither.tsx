"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { DitherProps } from "@/components/Dither";

const Dither = dynamic(() => import("@/components/Dither"), {
  loading: () => null,
  ssr: false,
});

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function DeferredDither(props: DitherProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const browserWindow = window as IdleWindow;

    if (typeof browserWindow.requestIdleCallback === "function") {
      const idleId = browserWindow.requestIdleCallback(() => setReady(true), {
        timeout: 1200,
      });

      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = browserWindow.setTimeout(() => setReady(true), 800);
    return () => browserWindow.clearTimeout(timeoutId);
  }, []);

  return ready ? <Dither {...props} /> : null;
}
