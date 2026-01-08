// instrumentation.ts
export async function register() {
  // check that it runs only in the Node.js runtime of Next.js / on server
  if (process.env.NEXT_RUNTIME === "node") {
    // Wir prüfen unseren eigenen Flag aus der playwright.config.ts
    if (process.env.NEXT_PUBLIC_IS_E2E_TEST === "true") {
      const { server } = await import("../tests/msw/node");
      server.listen({ onUnhandledRequest: "bypass" });
      console.log("🧪 MSW Mock Server für Next.js 16 aktiv");
    }
  }
}
