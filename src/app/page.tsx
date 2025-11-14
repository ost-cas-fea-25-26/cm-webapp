import LoginButton from "@/components/login-button";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();
console.log(process.env.ZITADEL_PROJECT_ID);
console.log(process.env.ZITADEL_CLIENT_ID);
  return (
    <main>
      <h1>Hello In Mumble</h1>
      <p>This is a short demo for using the API with authentication.</p>
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            Logout
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <LoginButton />
          </div>
        </div>
      )}
    </main>
  );
}
