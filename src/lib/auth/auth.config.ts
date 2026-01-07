import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { Pool } from "pg";
import { getBaseUrl } from "../utils/link";

export const PROVIDER_ID = "zitadel";

const clientId = process.env.ZITADEL_CLIENT_ID;
if (!clientId) {
  throw new Error("ZITADEL_CLIENT_ID is not set");
}
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.MUMBLE_DATABASE_URL,
  }),
  user: {
    additionalFields: {
      identifier: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false,
      },
    },
  },
  baseURL: getBaseUrl(),
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: PROVIDER_ID,
          clientId: clientId!,
          clientSecret: "", // PKCE without client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            "urn:zitadel:iam:org:project:id:348701753820117818:aud",
          ],
          pkce: true,
          mapProfileToUser: (profile) => {
            return {
              identifier: profile.sub,
              email: profile.email,
            };
          },
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET!,
});
