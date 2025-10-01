import { getSession as keyloomGetSession } from "@keyloom/nextjs";
import { cookies } from "next/headers";

export async function getSession(
  config: typeof import("@/keyloom.config").default,
) {
  // Ensure cookies are awaited to comply with Next.js 15+ requirements
  await cookies();

  return await keyloomGetSession(config);
}
