import { createAuthMiddleware } from "@keyloom/nextjs";
// import routes from './.keyloom/routes.generated'
import keyloomConfig from "./keyloom.config";

export default createAuthMiddleware(keyloomConfig, {
  // routes
  publicRoutes: ["/", "/sign-in"],
});

export const config = {
  matcher: ["/((?!_next|.*\\.(?:ico|png|jpg|svg|css|js|map)).*)"],
};
