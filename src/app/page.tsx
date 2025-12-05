import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      <h1>Hello In Mumble</h1>
    </main>
  );
}
