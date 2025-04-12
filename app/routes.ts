import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "routes/homepage.tsx"),
  route("/diseases", "routes/diseases.tsx"),
] satisfies RouteConfig;
