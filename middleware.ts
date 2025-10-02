import { createAuthMiddleware } from "@keyloom/nextjs";
// import routes from './.keyloom/routes.generated'
import keyloomConfig from "./keyloom.config";

export default createAuthMiddleware(keyloomConfig, {
  // routes
  publicRoutes: ["/", "/sign-in", "/sign-up", /^\/api\/auth\/.*/],
});

export const config = {
  matcher: ["/((?!_next|api|.*\\.(?:ico|png|jpg|svg|css|js|map)).*)"],
};
