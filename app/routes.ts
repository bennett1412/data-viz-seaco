import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./pages/layout.tsx", [
    index("./components/homepage/index.tsx"),
    route("/timeline", "pages/timeline-view.tsx"),
    route("/map", "pages/map-view.tsx"),
    route("/variables", "pages/variable-explorer.tsx"),
    route("/explore/:datasetId", "pages/explore-view.tsx"),
    route("/explore/:datasetId/ncds", "pages/explore/ncds.tsx"),
    route("/explore/:datasetId/ncds/:variableId", "pages/explore/ncds/variable.tsx"),
    route("/explore/:datasetId/socioeconomic/:variableId", "pages/explore/socioeconomic/variable.tsx"),
  ]),
] satisfies RouteConfig;
