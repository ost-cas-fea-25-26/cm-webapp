"use client";

import { signinZitadel } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <button
      onClick={() => signinZitadel()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login with Zitadel
    </button>
  );
}
