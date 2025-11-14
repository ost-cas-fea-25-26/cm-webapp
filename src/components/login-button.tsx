"use client";

import { signinZitadel } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <button
      onClick={() => signinZitadel()}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Login with Zitadel
    </button>
  );
}
