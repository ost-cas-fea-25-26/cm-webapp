import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import Database from "better-sqlite3";
import { headers } from "next/headers";
import { cache } from "react";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
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
