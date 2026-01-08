export async function register() {
  if (
    process.env.NEXT_RUNTIME === "node" &&
    process.env.NEXT_PUBLIC_IS_E2E_TEST === "true"
  ) {
    const { initMocks } = await import("../tests/msw/index");
    await initMocks();
    console.log("🧪 MSW Server-Side Mocks aktiv");
  }
}
