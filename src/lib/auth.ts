import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { createClient } from "@libsql/client";
import { headers } from "next/headers";
import { cache } from "react";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

export const auth = betterAuth({
  database: turso,
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: "zitadel",
          clientId: process.env.ZITADEL_CLIENT_ID ?? "",
          clientSecret: "", // PKCE without client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            `urn:zitadel:iam:org:project:id:${process.env.ZITADEL_PROJECT_ID}:aud`,
          ],
          pkce: true,
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET ?? "this-is-very-secret",
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
