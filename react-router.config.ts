import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  routes: {
    path: "/",
    lazy: () => import("./app/components/RootLayout"),
    children: [
      {
        index: true,
        lazy: () => import("./app/routes/index"),
      },
      {
        path: "timeline",
        lazy: () => import("./app/routes/timeline"),
      },
      {
        path: "map",
        lazy: () => import("./app/routes/map"),
      },
    ],
  },
} as Config;
