import { defineKeyloom } from "@keyloom/core/config";
import { PrismaAdapter } from "@keyloom/adapters";
import github from "@keyloom/providers/github";
import { db } from "@/lib/db";

export default defineKeyloom({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL,
  session: { strategy: "database", ttlMinutes: 60, rolling: true },
  adapter: PrismaAdapter(db),
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  rbac: {
    enabled: true,
    roles: {
      owner: {
        permissions: [
          "manage:org",
          "manage:users",
          "manage:billing",
          "read",
          "write",
        ],
      },
      admin: { permissions: ["manage:users", "read", "write"] },
      member: { permissions: ["read"] },
    },
  },
  cookie: { sameSite: "lax" },
  secrets: { authSecret: process.env.AUTH_SECRET },
});
