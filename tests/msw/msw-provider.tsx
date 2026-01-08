"use client";
import { useEffect, useState, ReactNode } from "react";

export function MSWProvider({ children }: { children: ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { initMocks } = await import("./index");
      await initMocks();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady && process.env.NEXT_PUBLIC_IS_E2E_TEST === "true") {
    return null; // Zeige nichts an, bis Mocks bereit sind
  }

  return <>{children}</>;
}
