import { AuthServer } from "@/lib/auth/server";
import { toNextJsHandler } from "better-auth/next-js";

const authServer = new AuthServer();
export const { GET, POST } = toNextJsHandler(authServer.server);
